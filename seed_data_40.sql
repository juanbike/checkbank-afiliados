-- INSERCIÓN MASIVA DE DATOS DE PRUEBA (40 REGISTROS)
BEGIN;
-- Registro 1: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (1, 'ente_gubernamental', 'Plan Profesional', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user1_l9xq@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 1', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (1, 'Transferencia', 'REF945203', 94, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (1, 'Ministerio 1', 'G-20000000', 'user1_l9xq@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (1, 'user1_l9xq@example.com', 'Aragua', 'Comercio General');

-- Registro 2: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (2, 'natural', 'Plan Profesional', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user2_2beh@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 2', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (2, 'Transferencia', 'REF960071', 393, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (2, 'Nombre2', 'Apellido2', 'V27000000', 'user2_2beh@example.com', 'Lara');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (2, 'user2_2beh@example.com', 'Carabobo', 'Comercio General');

-- Registro 3: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (3, 'ente_gubernamental', 'Plan Emprendedor', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user3_dkze@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 3', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (3, 'Transferencia', 'REF306480', 139, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (3, 'Ministerio 3', 'G-20000000', 'user3_dkze@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (3, 'user3_dkze@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 4: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (4, 'firma_personal', 'Plan Profesional', 'mensual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user4_cy4j@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 4', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (4, 'Transferencia', 'REF927407', 15, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (4, 'Firma 4', 'V-10000000', 'user4_cy4j@example.com', 'Distrito Capital');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (4, 'user4_cy4j@example.com', 'Carabobo', 'Comercio General');

-- Registro 5: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (5, 'ente_gubernamental', 'Plan Corporativo', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user5_tvob@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 5', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (5, 'Transferencia', 'REF658278', 358, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (5, 'Ministerio 5', 'G-20000000', 'user5_tvob@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (5, 'user5_tvob@example.com', 'Miranda', 'Comercio General');

-- Registro 6: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (6, 'firma_personal', 'Plan Profesional', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user6_yf0m@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 6', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (6, 'Transferencia', 'REF156917', 308, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (6, 'Firma 6', 'V-25000000', 'user6_yf0m@example.com', 'Distrito Capital');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (6, 'user6_yf0m@example.com', 'Aragua', 'Comercio General');

-- Registro 7: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (7, 'natural', 'Plan Profesional', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user7_e0jt@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 7', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (7, 'Transferencia', 'REF485722', 129, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (7, 'Nombre7', 'Apellido7', 'V16000000', 'user7_e0jt@example.com', 'Miranda');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (7, 'user7_e0jt@example.com', 'Carabobo', 'Comercio General');

-- Registro 8: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (8, 'juridica', 'Plan Profesional', 'mensual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user8_vv3b@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 8', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (8, 'Transferencia', 'REF994567', 253, 'USD', 'approved');
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado) VALUES (8, 'Empresa 8 C.A.', 'J-53000000', 'user8_vv3b@example.com', 'Zulia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (8, 'user8_vv3b@example.com', 'Carabobo', 'Comercio General');

-- Registro 9: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (9, 'natural', 'Plan Emprendedor', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user9_vqih@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 9', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (9, 'Transferencia', 'REF859793', 287, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (9, 'Nombre9', 'Apellido9', 'V16000000', 'user9_vqih@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (9, 'user9_vqih@example.com', 'Aragua', 'Comercio General');

-- Registro 10: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (10, 'ente_gubernamental', 'Plan Emprendedor', 'mensual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user10_85x2@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 10', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (10, 'Transferencia', 'REF336062', 331, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (10, 'Ministerio 10', 'G-20000000', 'user10_85x2@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (10, 'user10_85x2@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 11: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (11, 'firma_personal', 'Plan Emprendedor', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user11_w8cm@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 11', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (11, 'Transferencia', 'REF503376', 405, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (11, 'Firma 11', 'V-24000000', 'user11_w8cm@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (11, 'user11_w8cm@example.com', 'Lara', 'Comercio General');

-- Registro 12: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (12, 'juridica', 'Plan Emprendedor', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user12_q4rq@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 12', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (12, 'Transferencia', 'REF788454', 94, 'USD', 'approved');
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado) VALUES (12, 'Empresa 12 C.A.', 'J-24000000', 'user12_q4rq@example.com', 'Lara');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (12, 'user12_q4rq@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 13: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (13, 'emprendedor', 'Plan Corporativo', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user13_v3vs@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 13', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (13, 'Transferencia', 'REF525225', 115, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (13, 'Emprendedor 13', 'Proyecto 13', 'user13_v3vs@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (13, 'user13_v3vs@example.com', 'Miranda', 'Comercio General');

-- Registro 14: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (14, 'emprendedor', 'Plan Profesional', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user14_1b6h@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 14', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (14, 'Transferencia', 'REF689797', 429, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (14, 'Emprendedor 14', 'Proyecto 14', 'user14_1b6h@example.com', 'Lara');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (14, 'user14_1b6h@example.com', 'Zulia', 'Comercio General');

-- Registro 15: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (15, 'emprendedor', 'Plan Profesional', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user15_p0sk@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 15', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (15, 'Transferencia', 'REF238822', 262, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (15, 'Emprendedor 15', 'Proyecto 15', 'user15_p0sk@example.com', 'Zulia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (15, 'user15_p0sk@example.com', 'Miranda', 'Comercio General');

-- Registro 16: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (16, 'ente_gubernamental', 'Plan Corporativo', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user16_gvp6@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 16', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (16, 'Transferencia', 'REF187411', 254, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (16, 'Ministerio 16', 'G-20000000', 'user16_gvp6@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (16, 'user16_gvp6@example.com', 'Carabobo', 'Comercio General');

-- Registro 17: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (17, 'firma_personal', 'Plan Profesional', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user17_lolc@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 17', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (17, 'Transferencia', 'REF323961', 138, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (17, 'Firma 17', 'V-25000000', 'user17_lolc@example.com', 'Distrito Capital');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (17, 'user17_lolc@example.com', 'Carabobo', 'Comercio General');

-- Registro 18: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (18, 'natural', 'Plan Emprendedor', 'mensual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user18_mexr@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 18', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (18, 'Transferencia', 'REF841191', 41, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (18, 'Nombre18', 'Apellido18', 'V17000000', 'user18_mexr@example.com', 'Lara');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (18, 'user18_mexr@example.com', 'Lara', 'Comercio General');

-- Registro 19: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (19, 'emprendedor', 'Plan Emprendedor', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user19_d7an@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 19', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (19, 'Transferencia', 'REF829548', 309, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (19, 'Emprendedor 19', 'Proyecto 19', 'user19_d7an@example.com', 'Miranda');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (19, 'user19_d7an@example.com', 'Zulia', 'Comercio General');

-- Registro 20: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (20, 'firma_personal', 'Plan Emprendedor', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user20_rx08@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 20', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (20, 'Transferencia', 'REF252709', 477, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (20, 'Firma 20', 'V-26000000', 'user20_rx08@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (20, 'user20_rx08@example.com', 'Aragua', 'Comercio General');

-- Registro 21: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (21, 'emprendedor', 'Plan Corporativo', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user21_d1ch@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 21', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (21, 'Transferencia', 'REF178185', 317, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (21, 'Emprendedor 21', 'Proyecto 21', 'user21_d1ch@example.com', 'Zulia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (21, 'user21_d1ch@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 22: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (22, 'emprendedor', 'Plan Corporativo', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user22_84lc@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 22', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (22, 'Transferencia', 'REF137127', 356, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (22, 'Emprendedor 22', 'Proyecto 22', 'user22_84lc@example.com', 'Lara');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (22, 'user22_84lc@example.com', 'Aragua', 'Comercio General');

-- Registro 23: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (23, 'ente_gubernamental', 'Plan Corporativo', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user23_exkj@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 23', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (23, 'Transferencia', 'REF368023', 443, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (23, 'Ministerio 23', 'G-20000000', 'user23_exkj@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (23, 'user23_exkj@example.com', 'Carabobo', 'Comercio General');

-- Registro 24: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (24, 'natural', 'Plan Profesional', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user24_9e7i@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 24', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (24, 'Transferencia', 'REF599589', 51, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (24, 'Nombre24', 'Apellido24', 'V15000000', 'user24_9e7i@example.com', 'Aragua');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (24, 'user24_9e7i@example.com', 'Lara', 'Comercio General');

-- Registro 25: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (25, 'emprendedor', 'Plan Corporativo', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user25_yvi9@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 25', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (25, 'Transferencia', 'REF546204', 467, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (25, 'Emprendedor 25', 'Proyecto 25', 'user25_yvi9@example.com', 'Zulia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (25, 'user25_yvi9@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 26: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (26, 'emprendedor', 'Plan Profesional', 'mensual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user26_v5p2@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 26', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (26, 'Transferencia', 'REF674174', 415, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (26, 'Emprendedor 26', 'Proyecto 26', 'user26_v5p2@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (26, 'user26_v5p2@example.com', 'Miranda', 'Comercio General');

-- Registro 27: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (27, 'firma_personal', 'Plan Corporativo', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user27_l6ru@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 27', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (27, 'Transferencia', 'REF570641', 50, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (27, 'Firma 27', 'V-17000000', 'user27_l6ru@example.com', 'Distrito Capital');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (27, 'user27_l6ru@example.com', 'Miranda', 'Comercio General');

-- Registro 28: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (28, 'emprendedor', 'Plan Corporativo', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user28_yyis@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 28', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (28, 'Transferencia', 'REF876004', 146, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (28, 'Emprendedor 28', 'Proyecto 28', 'user28_yyis@example.com', 'Distrito Capital');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (28, 'user28_yyis@example.com', 'Aragua', 'Comercio General');

-- Registro 29: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (29, 'natural', 'Plan Corporativo', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user29_ww2y@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 29', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (29, 'Transferencia', 'REF307764', 367, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (29, 'Nombre29', 'Apellido29', 'V23000000', 'user29_ww2y@example.com', 'Lara');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (29, 'user29_ww2y@example.com', 'Carabobo', 'Comercio General');

-- Registro 30: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (30, 'juridica', 'Plan Profesional', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user30_yfyu@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 30', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (30, 'Transferencia', 'REF881520', 44, 'USD', 'approved');
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado) VALUES (30, 'Empresa 30 C.A.', 'J-38000000', 'user30_yfyu@example.com', 'Zulia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (30, 'user30_yfyu@example.com', 'Aragua', 'Comercio General');

-- Registro 31: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (31, 'firma_personal', 'Plan Emprendedor', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user31_zlc6@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 31', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (31, 'Transferencia', 'REF989572', 317, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (31, 'Firma 31', 'V-27000000', 'user31_zlc6@example.com', 'Miranda');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (31, 'user31_zlc6@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 32: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (32, 'natural', 'Plan Profesional', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user32_3egn@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 32', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (32, 'Transferencia', 'REF672718', 75, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (32, 'Nombre32', 'Apellido32', 'V26000000', 'user32_3egn@example.com', 'Zulia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (32, 'user32_3egn@example.com', 'Distrito Capital', 'Comercio General');

-- Registro 33: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (33, 'juridica', 'Plan Emprendedor', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user33_fkv9@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 33', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (33, 'Transferencia', 'REF691422', 246, 'USD', 'approved');
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado) VALUES (33, 'Empresa 33 C.A.', 'J-80000000', 'user33_fkv9@example.com', 'Aragua');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (33, 'user33_fkv9@example.com', 'Aragua', 'Comercio General');

-- Registro 34: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (34, 'ente_gubernamental', 'Plan Corporativo', 'anual', 'active');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user34_x4vd@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 34', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (34, 'Transferencia', 'REF194674', 397, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (34, 'Ministerio 34', 'G-20000000', 'user34_x4vd@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (34, 'user34_x4vd@example.com', 'Aragua', 'Comercio General');

-- Registro 35: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (35, 'natural', 'Plan Corporativo', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user35_weto@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 35', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (35, 'Transferencia', 'REF474022', 287, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (35, 'Nombre35', 'Apellido35', 'V19000000', 'user35_weto@example.com', 'Distrito Capital');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (35, 'user35_weto@example.com', 'Carabobo', 'Comercio General');

-- Registro 36: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (36, 'emprendedor', 'Plan Profesional', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user36_u1gf@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 36', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (36, 'Transferencia', 'REF489538', 129, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (36, 'Emprendedor 36', 'Proyecto 36', 'user36_u1gf@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (36, 'user36_u1gf@example.com', 'Lara', 'Comercio General');

-- Registro 37: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (37, 'emprendedor', 'Plan Profesional', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user37_8p3y@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 37', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (37, 'Transferencia', 'REF909641', 288, 'USD', 'approved');
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES (37, 'Emprendedor 37', 'Proyecto 37', 'user37_8p3y@example.com', 'Aragua');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (37, 'user37_8p3y@example.com', 'Lara', 'Comercio General');

-- Registro 38: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (38, 'ente_gubernamental', 'Plan Corporativo', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user38_v55h@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 38', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (38, 'Transferencia', 'REF507297', 112, 'USD', 'approved');
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES (38, 'Ministerio 38', 'G-20000000', 'user38_v55h@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (38, 'user38_v55h@example.com', 'Zulia', 'Comercio General');

-- Registro 39: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (39, 'natural', 'Plan Corporativo', 'mensual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user39_8ibo@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 39', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (39, 'Transferencia', 'REF253501', 219, 'USD', 'approved');
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES (39, 'Nombre39', 'Apellido39', 'V17000000', 'user39_8ibo@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (39, 'user39_8ibo@example.com', 'Lara', 'Comercio General');

-- Registro 40: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES (40, 'firma_personal', 'Plan Profesional', 'anual', 'pending');
INSERT INTO auth_users (username, password, full_name, role) VALUES ('user40_1gje@example.com', '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX', 'Usuario de Prueba 40', 'affiliate');
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES (40, 'Transferencia', 'REF910026', 424, 'USD', 'approved');
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES (40, 'Firma 40', 'V-30000000', 'user40_1gje@example.com', 'Carabobo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES (40, 'user40_1gje@example.com', 'Lara', 'Comercio General');

COMMIT;