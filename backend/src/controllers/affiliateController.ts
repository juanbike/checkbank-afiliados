import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcryptjs';

export const initAffiliate = async (req: Request, res: Response) => {
    const data = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Insert into affiliates (initial record)
        const affiliateRes = await client.query(
            'INSERT INTO affiliates (client_type, plan, payment_period, status) VALUES ($1, $2, $3, $4) RETURNING id',
            [data.clientType, data.selectedPlan, data.selectedPeriod, 'pending']
        );
        const affiliateId = affiliateRes.rows[0].id;

        // 2. Create User for Login
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await client.query(
            'INSERT INTO auth_users (username, password, full_name, role, branch) VALUES ($1, $2, $3, $4, $5)',
            [data.email, hashedPassword, data.fullName || data.email, 'affiliate', 'Principal']
        );

        // 3. Link affiliate to auth (optional, but keep it in affiliate_auth if we want to separate)
        // For now, we use email as username in auth_users.

        // 4. Insert Payment
        await client.query(
            `INSERT INTO affiliate_payments 
            (affiliate_id, metodo_pago, referencia, fecha_pago, monto, moneda, status, detalles_pago)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                affiliateId, data.paymentMethod, data.paymentReference,
                new Date(),
                data.amount || 0,
                'USD', // Default or from data
                'pending',
                JSON.stringify({
                    email: data.email,
                    bank: data.bank
                })
            ]
        );

        await client.query('COMMIT');
        res.status(201).json({
            message: 'Afiliación iniciada. Por favor procede a la activación.',
            affiliateId,
            username: data.email
        });
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error in initAffiliate:', error);

        if (error.code === '23505') {
            res.status(400).json({
                message: 'Error de duplicado: El correo o la referencia ya existen.',
                detail: error.detail
            });
        } else {
            res.status(500).json({ message: 'Error al iniciar la afiliación' });
        }
    } finally {
        client.release();
    }
};

export const activateAffiliate = async (req: Request, res: Response) => {
    const { affiliateId, clientData, commerceData } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Update/Insert Profile based on type
        const type = clientData.clientType;
        if (type === 'natural') {
            await client.query(
                `INSERT INTO affiliate_natural_profiles 
                (affiliate_id, nombres, apellidos, documento_identidad, fecha_nacimiento, genero, profesion_ocupacion, direccion_principal, estado, ciudad, municipio, parroquia, codigo_postal, correo_electronico, telefono_movil)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombres = EXCLUDED.nombres, apellidos = EXCLUDED.apellidos, documento_identidad = EXCLUDED.documento_identidad`,
                [
                    affiliateId, clientData.nombres, clientData.apellidos, clientData.documentoIdentidad,
                    clientData.fechaNacimiento, clientData.genero, clientData.profesionOcupacion,
                    clientData.direccionPrincipal, clientData.estado, clientData.ciudad || 'N/A',
                    clientData.municipio, clientData.parroquia || 'N/A', clientData.codigoPostal,
                    clientData.correoElectronico, clientData.telefonoMovil
                ]
            );
        } else if (type === 'juridica') {
            await client.query(
                `INSERT INTO affiliate_juridica_profiles 
                (affiliate_id, razon_social, rif_nit, domicilio_fiscal, estado, ciudad, municipio, parroquia, codigo_postal, rep_nombres, rep_apellidos, rep_documento, correo_corporativo, telefono_fijo)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                razon_social = EXCLUDED.razon_social, rif_nit = EXCLUDED.rif_nit`,
                [
                    affiliateId, clientData.razonSocial, clientData.rifNit, clientData.domicilioFiscal,
                    clientData.estadoJuridica, clientData.ciudadJuridica || 'N/A', clientData.municipioJuridica,
                    clientData.parroquiaJuridica || 'N/A', clientData.codigoPostalJuridica,
                    clientData.nombresRepresentante, clientData.apellidosRepresentante,
                    clientData.documentoRepresentante, clientData.correoCorporativo, clientData.telefonoFijo
                ]
            );
        } else if (type === 'firma_personal') {
            await client.query(
                `INSERT INTO affiliate_firma_profiles 
                (affiliate_id, nombre_firma, rif_firma, nombre_titular, cedula_titular, direccion_fiscal, estado, ciudad, municipio, parroquia, codigo_postal, correo_firma, telefono_firma, actividad_comercial)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombre_firma = EXCLUDED.nombre_firma, rif_firma = EXCLUDED.rif_firma`,
                [
                    affiliateId, clientData.nombreFirma, clientData.rifFirma, clientData.nombreTitular,
                    clientData.cedulaTitular, clientData.direccionFiscalFirma,
                    clientData.estadoFirma, clientData.ciudadFirma || 'N/A', clientData.municipioFirma,
                    clientData.parroquiaFirma || 'N/A', clientData.codigoPostalFirma,
                    clientData.correoFirma, clientData.telefonoFirma, clientData.actividadComercial
                ]
            );
        } else if (type === 'ente_gubernamental') {
            await client.query(
                `INSERT INTO affiliate_gob_profiles 
                (affiliate_id, nombre_institucion, rif_nit_gob, direccion_administrativa, nombre_contacto, cargo_contacto, correo_contacto, telefono_contacto, referencia_contrato)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombre_institucion = EXCLUDED.nombre_institucion, rif_nit_gob = EXCLUDED.rif_nit_gob`,
                [
                    affiliateId, clientData.nombreInstitucion, clientData.rifNitGob, clientData.direccionAdministrativa,
                    clientData.nombreContacto, clientData.cargoContacto, clientData.correoContacto,
                    clientData.telefonoContacto, clientData.referenciaContrato
                ]
            );
        } else if (type === 'emprendedor') {
            await client.query(
                `INSERT INTO affiliate_emprendedor_profiles 
                (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, area_proyecto, direccion, estado, ciudad, municipio, parroquia, codigo_postal, correo_emprendedor, telefono_emprendedor, descripcion_proyecto)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombre_proyecto = EXCLUDED.nombre_proyecto`,
                [
                    affiliateId, clientData.nombresEmprendedor, clientData.apellidosEmprendedor, clientData.cedulaEmprendedor,
                    clientData.nombreProyecto, clientData.areaProyecto, clientData.direccionEmprendedor,
                    clientData.estadoEmprendedor, clientData.ciudadEmprendedor || 'N/A', clientData.municipioEmprendedor,
                    clientData.parroquiaEmprendedor || 'N/A', clientData.codigoPostalEmprendedor,
                    clientData.correoEmprendedor, clientData.telefonoEmprendedor, clientData.descripcionProyecto
                ]
            );
        }
        // ... extend for other types if needed ...

        // 2. Insert/Update Commerce Data
        await client.query(
            `INSERT INTO affiliate_commerce_data 
            (affiliate_id, direccion_calle, direccion_numero, direccion_ciudad, estado_comercio, municipio_comercio, codigo_postal, telefono_comercio, email_administrativo, sitio_web, descripcion_negocio, canales_venta, redes_sociales, actividad_economica, fuente_ingresos, volumen_ventas_mensual, valor_promedio_transaccion, paises_venta)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            ON CONFLICT (affiliate_id) DO UPDATE SET
            direccion_calle = EXCLUDED.direccion_calle, email_administrativo = EXCLUDED.email_administrativo`,
            [
                affiliateId, commerceData.direccionCalle, commerceData.direccionNumero, commerceData.direccionCiudad,
                commerceData.estadoComercio, commerceData.municipioComercio,
                commerceData.codigoPostal, commerceData.telefonoComercio, commerceData.emailAdministrativo,
                commerceData.sitioWeb, commerceData.descripcionNegocio,
                JSON.stringify(commerceData.canalesVenta || []),
                JSON.stringify(commerceData.redesSociales || {}),
                commerceData.actividadEconomica, commerceData.fuenteIngresos,
                commerceData.volumenVentasMensual, commerceData.valorPromedioTransaccion,
                JSON.stringify(commerceData.paisesVenta || [])
            ]
        );

        // 3. Update Status
        await client.query(
            'UPDATE affiliates SET status = $1, updated_at = NOW() WHERE id = $2',
            ['active', affiliateId]
        );

        await client.query('COMMIT');
        res.status(200).json({ message: 'Afiliación activada exitosamente' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error in activateAffiliate:', error);
        res.status(500).json({ message: 'Error al activar la afiliación' });
    } finally {
        client.release();
    }
};

export const getAffiliates = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT a.*, 
                   COALESCE(n.nombres || ' ' || n.apellidos, j.razon_social, f.nombre_firma, g.nombre_institucion, e.nombres || ' ' || e.apellidos) as display_name,
                   COALESCE(n.correo_electronico, j.correo_corporativo, f.correo_firma, g.correo_contacto, e.correo_emprendedor) as email
            FROM affiliates a
            LEFT JOIN affiliate_natural_profiles n ON a.id = n.affiliate_id
            LEFT JOIN affiliate_juridica_profiles j ON a.id = j.affiliate_id
            LEFT JOIN affiliate_firma_profiles f ON a.id = f.affiliate_id
            LEFT JOIN affiliate_gob_profiles g ON a.id = g.affiliate_id
            LEFT JOIN affiliate_emprendedor_profiles e ON a.id = e.affiliate_id
            ORDER BY a.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error in getAffiliates:', error);
        res.status(500).json({ message: 'Error al obtener los afiliados' });
    }
};
