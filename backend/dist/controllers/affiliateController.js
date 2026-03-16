"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAffiliate = exports.updateAffiliate = exports.getAffiliateById = exports.getProfile = exports.updatePlan = exports.getAffiliates = exports.activateAffiliate = exports.initAffiliate = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = require("../utils/logger");
const initAffiliate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const client = yield db_1.default.connect();
    try {
        yield client.query('BEGIN');
        // 1. Insert into affiliates (initial record)
        const affiliateRes = yield client.query('INSERT INTO affiliates (client_type, plan, payment_period, status) VALUES ($1, $2, $3, $4) RETURNING id', [data.clientType, data.selectedPlan, data.selectedPeriod, 'pending']);
        const affiliateId = affiliateRes.rows[0].id;
        // 2. Create User for Login and link to affiliate
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        yield client.query(`INSERT INTO auth_users (username, password, full_name, branch, affiliate_id, role_id) 
             VALUES ($1, $2, $3, $4, $5, (SELECT id FROM roles WHERE slug = 'affiliate'))`, [data.email, hashedPassword, data.fullName || data.email, 'Principal', affiliateId]);
        // 3. Link affiliate to auth (optional, but keep it in affiliate_auth if we want to separate)
        // For now, we use email as username in auth_users.
        // 4. Insert Payment
        yield client.query(`INSERT INTO affiliate_payments 
            (affiliate_id, metodo_pago, referencia, fecha_pago, monto, moneda, status, detalles_pago)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
            affiliateId, data.paymentMethod, data.paymentReference,
            new Date(),
            data.amount || 0,
            'USD', // Default or from data
            'pending',
            JSON.stringify({
                email: data.email,
                bank: data.bank
            })
        ]);
        yield client.query('COMMIT');
        // Log the activity
        yield (0, logger_1.logActivity)({
            action: 'INIT_AFFILIATION',
            entityType: 'affiliate',
            entityId: affiliateId,
            details: { email: data.email, plan: data.selectedPlan },
            ipAddress: req.ip
        });
        res.status(201).json({
            message: 'Afiliación iniciada. Por favor procede a la activación.',
            affiliateId,
            username: data.email
        });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        (0, logger_1.logError)(error, 'initAffiliate');
        if (error.code === '23505') {
            res.status(400).json({
                message: 'Error de duplicado: El correo o la referencia ya existen.',
                detail: error.detail
            });
        }
        else {
            res.status(500).json({ message: 'Error al iniciar la afiliación' });
        }
    }
    finally {
        client.release();
    }
});
exports.initAffiliate = initAffiliate;
const activateAffiliate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { affiliateId, clientData, commerceData } = req.body;
    const client = yield db_1.default.connect();
    try {
        yield client.query('BEGIN');
        // 1. Update/Insert Profile based on type
        const type = clientData.clientType;
        if (type === 'natural') {
            yield client.query(`INSERT INTO affiliate_natural_profiles 
                (affiliate_id, nombres, apellidos, documento_identidad, fecha_nacimiento, genero, profesion_ocupacion, direccion_principal, estado, ciudad, municipio, parroquia, codigo_postal, correo_electronico, telefono_movil)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombres = EXCLUDED.nombres, apellidos = EXCLUDED.apellidos, documento_identidad = EXCLUDED.documento_identidad`, [
                affiliateId, clientData.nombres, clientData.apellidos, clientData.documentoIdentidad,
                clientData.fechaNacimiento, clientData.genero, clientData.profesionOcupacion,
                clientData.direccionPrincipal, clientData.estado, clientData.ciudad || 'N/A',
                clientData.municipio, clientData.parroquia || 'N/A', clientData.codigoPostal,
                clientData.correoElectronico, clientData.telefonoMovil
            ]);
        }
        else if (type === 'juridica') {
            yield client.query(`INSERT INTO affiliate_juridica_profiles 
                (affiliate_id, razon_social, rif_nit, domicilio_fiscal, estado, ciudad, municipio, parroquia, codigo_postal, rep_nombres, rep_apellidos, rep_documento, correo_corporativo, telefono_fijo)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                razon_social = EXCLUDED.razon_social, rif_nit = EXCLUDED.rif_nit`, [
                affiliateId, clientData.razonSocial, clientData.rifNit, clientData.domicilioFiscal,
                clientData.estadoJuridica, clientData.ciudadJuridica || 'N/A', clientData.municipioJuridica,
                clientData.parroquiaJuridica || 'N/A', clientData.codigoPostalJuridica,
                clientData.nombresRepresentante, clientData.apellidosRepresentante,
                clientData.documentoRepresentante, clientData.correoCorporativo, clientData.telefonoFijo
            ]);
        }
        else if (type === 'firma_personal') {
            yield client.query(`INSERT INTO affiliate_firma_profiles 
                (affiliate_id, nombre_firma, rif_firma, nombre_titular, cedula_titular, direccion_fiscal, estado, ciudad, municipio, parroquia, codigo_postal, correo_firma, telefono_firma, actividad_comercial)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombre_firma = EXCLUDED.nombre_firma, rif_firma = EXCLUDED.rif_firma`, [
                affiliateId, clientData.nombreFirma, clientData.rifFirma, clientData.nombreTitular,
                clientData.cedulaTitular, clientData.direccionFiscalFirma,
                clientData.estadoFirma, clientData.ciudadFirma || 'N/A', clientData.municipioFirma,
                clientData.parroquiaFirma || 'N/A', clientData.codigoPostalFirma,
                clientData.correoFirma, clientData.telefonoFirma, clientData.actividadComercial
            ]);
        }
        else if (type === 'ente_gubernamental') {
            yield client.query(`INSERT INTO affiliate_gob_profiles 
                (affiliate_id, nombre_institucion, rif_nit_gob, direccion_administrativa, nombre_contacto, cargo_contacto, correo_contacto, telefono_contacto, referencia_contrato)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombre_institucion = EXCLUDED.nombre_institucion, rif_nit_gob = EXCLUDED.rif_nit_gob`, [
                affiliateId, clientData.nombreInstitucion, clientData.rifNitGob, clientData.direccionAdministrativa,
                clientData.nombreContacto, clientData.cargoContacto, clientData.correoContacto,
                clientData.telefonoContacto, clientData.referenciaContrato
            ]);
        }
        else if (type === 'emprendedor') {
            yield client.query(`INSERT INTO affiliate_emprendedor_profiles 
                (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, area_proyecto, direccion, estado, ciudad, municipio, parroquia, codigo_postal, correo_emprendedor, telefono_emprendedor, descripcion_proyecto)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                ON CONFLICT (affiliate_id) DO UPDATE SET
                nombre_proyecto = EXCLUDED.nombre_proyecto`, [
                affiliateId, clientData.nombresEmprendedor, clientData.apellidosEmprendedor, clientData.cedulaEmprendedor,
                clientData.nombreProyecto, clientData.areaProyecto, clientData.direccionEmprendedor,
                clientData.estadoEmprendedor, clientData.ciudadEmprendedor || 'N/A', clientData.municipioEmprendedor,
                clientData.parroquiaEmprendedor || 'N/A', clientData.codigoPostalEmprendedor,
                clientData.correoEmprendedor, clientData.telefonoEmprendedor, clientData.descripcionProyecto
            ]);
        }
        // ... extend for other types if needed ...
        // 2. Insert/Update Commerce Data
        yield client.query(`INSERT INTO affiliate_commerce_data 
            (affiliate_id, direccion_calle, direccion_numero, direccion_ciudad, estado_comercio, municipio_comercio, codigo_postal, telefono_comercio, email_administrativo, sitio_web, descripcion_negocio, canales_venta, redes_sociales, actividad_economica, fuente_ingresos, volumen_ventas_mensual, valor_promedio_transaccion, paises_venta)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            ON CONFLICT (affiliate_id) DO UPDATE SET
            direccion_calle = EXCLUDED.direccion_calle, email_administrativo = EXCLUDED.email_administrativo`, [
            affiliateId, commerceData.direccionCalle, commerceData.direccionNumero, commerceData.direccionCiudad,
            commerceData.estadoComercio, commerceData.municipioComercio,
            commerceData.codigoPostal, commerceData.telefonoComercio, commerceData.emailAdministrativo,
            commerceData.sitioWeb, commerceData.descripcionNegocio,
            JSON.stringify(commerceData.canalesVenta || []),
            JSON.stringify(commerceData.redesSociales || {}),
            commerceData.actividadEconomica, commerceData.fuenteIngresos,
            commerceData.volumenVentasMensual, commerceData.valorPromedioTransaccion,
            JSON.stringify(commerceData.paisesVenta || [])
        ]);
        // 3. Update Status
        yield client.query('UPDATE affiliates SET status = $1, updated_at = NOW() WHERE id = $2', ['active', affiliateId]);
        yield client.query('COMMIT');
        // Log the activity
        yield (0, logger_1.logActivity)({
            action: 'ACTIVATE_AFFILIATE',
            entityType: 'affiliate',
            entityId: affiliateId,
            details: { type: clientData.clientType },
            ipAddress: req.ip
        });
        res.status(200).json({ message: 'Afiliación activada exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        (0, logger_1.logError)(error, 'activateAffiliate');
        res.status(500).json({ message: 'Error al activar la afiliación' });
    }
    finally {
        client.release();
    }
});
exports.activateAffiliate = activateAffiliate;
const getAffiliates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query(`
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
    }
    catch (error) {
        console.error('Error in getAffiliates:', error);
        res.status(500).json({ message: 'Error al obtener los afiliados' });
    }
});
exports.getAffiliates = getAffiliates;
const updatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plan, period } = req.body;
    const affiliateId = req.user.id; // Or mapping from user to affiliate
    try {
        // Find affiliate ID directly from auth_users
        const userRes = yield db_1.default.query('SELECT affiliate_id FROM auth_users WHERE id = $1', [req.user.id]);
        if (userRes.rows.length === 0)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        const realAffiliateId = userRes.rows[0].affiliate_id;
        if (!realAffiliateId) {
            return res.status(404).json({ message: 'Afiliado no vinculado a este usuario' });
        }
        yield db_1.default.query('UPDATE affiliates SET plan = $1, payment_period = $2, updated_at = NOW() WHERE id = $3', [plan, period, realAffiliateId]);
        res.json({ message: 'Plan actualizado exitosamente' });
    }
    catch (error) {
        (0, logger_1.logError)(error, 'updatePlan');
        res.status(500).json({ message: 'Error al actualizar el plan' });
    }
});
exports.updatePlan = updatePlan;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRes = yield db_1.default.query('SELECT username, full_name, role, branch, affiliate_id FROM auth_users WHERE id = $1', [req.user.id]);
        if (userRes.rows.length === 0)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        const user = userRes.rows[0];
        // Find affiliate info using direct link
        const affiliateRes = yield db_1.default.query(`
            SELECT a.*, 
                   COALESCE(n.nombres || ' ' || n.apellidos, j.razon_social, f.nombre_firma, g.nombre_institucion, e.nombres || ' ' || e.apellidos) as display_name,
                   COALESCE(n.correo_electronico, j.correo_corporativo, f.correo_firma, g.correo_contacto, e.correo_emprendedor) as contact_email
            FROM affiliates a
            LEFT JOIN affiliate_natural_profiles n ON a.id = n.affiliate_id
            LEFT JOIN affiliate_juridica_profiles j ON a.id = j.affiliate_id
            LEFT JOIN affiliate_firma_profiles f ON a.id = f.affiliate_id
            LEFT JOIN affiliate_gob_profiles g ON a.id = g.affiliate_id
            LEFT JOIN affiliate_emprendedor_profiles e ON a.id = e.affiliate_id
            WHERE a.id = $1
        `, [user.affiliate_id]);
        const affiliate = affiliateRes.rows[0];
        // Fetch latest payment
        let latestPayment = null;
        if (user.affiliate_id) {
            const paymentRes = yield db_1.default.query('SELECT * FROM affiliate_payments WHERE affiliate_id = $1 ORDER BY fecha_pago DESC LIMIT 1', [user.affiliate_id]);
            latestPayment = paymentRes.rows[0] || null;
        }
        res.json({
            user,
            affiliate: affiliate || null,
            latestPayment
        });
    }
    catch (error) {
        (0, logger_1.logError)(error, 'getProfile');
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
});
exports.getProfile = getProfile;
const getAffiliateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query(`
            SELECT a.*, 
                   COALESCE(n.nombres || ' ' || n.apellidos, j.razon_social, f.nombre_firma, g.nombre_institucion, e.nombres || ' ' || e.apellidos) as display_name,
                   COALESCE(n.correo_electronico, j.correo_corporativo, f.correo_firma, g.correo_contacto, e.correo_emprendedor) as email
            FROM affiliates a
            LEFT JOIN affiliate_natural_profiles n ON a.id = n.affiliate_id
            LEFT JOIN affiliate_juridica_profiles j ON a.id = j.affiliate_id
            LEFT JOIN affiliate_firma_profiles f ON a.id = f.affiliate_id
            LEFT JOIN affiliate_gob_profiles g ON a.id = g.affiliate_id
            LEFT JOIN affiliate_emprendedor_profiles e ON a.id = e.affiliate_id
            WHERE a.id = $1
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Afiliado no encontrado' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        (0, logger_1.logError)(error, 'getAffiliateById');
        res.status(500).json({ message: 'Error al obtener el afiliado' });
    }
});
exports.getAffiliateById = getAffiliateById;
const updateAffiliate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { status, plan, payment_period } = req.body;
    try {
        yield db_1.default.query('UPDATE affiliates SET status = $1, plan = $2, payment_period = $3, updated_at = NOW() WHERE id = $4', [status, plan, payment_period, id]);
        // Log the activity
        yield (0, logger_1.logActivity)({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            action: 'UPDATE_AFFILIATE',
            entityType: 'affiliate',
            entityId: id,
            details: { status, plan, payment_period },
            ipAddress: req.ip
        });
        res.json({ message: 'Afiliado actualizado exitosamente' });
    }
    catch (error) {
        (0, logger_1.logError)(error, 'updateAffiliate');
        res.status(500).json({ message: 'Error al actualizar el afiliado' });
    }
});
exports.updateAffiliate = updateAffiliate;
const deleteAffiliate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const client = yield db_1.default.connect();
    try {
        yield client.query('BEGIN');
        // Delete from related tables first
        yield client.query('DELETE FROM affiliate_natural_profiles WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliate_juridica_profiles WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliate_firma_profiles WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliate_gob_profiles WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliate_emprendedor_profiles WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliate_commerce_data WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliate_payments WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM auth_users WHERE affiliate_id = $1', [id]);
        yield client.query('DELETE FROM affiliates WHERE id = $1', [id]);
        yield client.query('COMMIT');
        // Log the activity
        yield (0, logger_1.logActivity)({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            action: 'DELETE_AFFILIATE',
            entityType: 'affiliate',
            entityId: id,
            ipAddress: req.ip
        });
        res.json({ message: 'Afiliado eliminado exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        (0, logger_1.logError)(error, 'deleteAffiliate');
        res.status(500).json({ message: 'Error al eliminar el afiliado' });
    }
    finally {
        client.release();
    }
});
exports.deleteAffiliate = deleteAffiliate;
