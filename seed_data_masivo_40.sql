-- INSERCIÓN MASIVA DE DATOS DE PRUEBA (40 REGISTROS)
BEGIN;
-- Registro 1: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('9c3b7545-a4d8-4131-a617-a16b8e554d69', 'emprendedor', 'estandar', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('f40960ec-12cc-4895-ac51-4fea150d4eb1', 'affiliate_1_2qv7@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 1', 'affiliate', '9c3b7545-a4d8-4131-a617-a16b8e554d69', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('9c3b7545-a4d8-4131-a617-a16b8e554d69', 'Emprendedor 1', 'Apellido 1', '290001', 'Proyecto Innova 1', 'affiliate_1_2qv7@example.com', 'Anzoátegui', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('9c3b7545-a4d8-4131-a617-a16b8e554d69', 'affiliate_1_2qv7@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('9c3b7545-a4d8-4131-a617-a16b8e554d69', 'Transferencia', 'PAGO-952110', 331, 'USD', 'approved');

-- Registro 2: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('50e8f3dd-08e4-47b4-81ed-199b5403689b', 'juridica', 'premium', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('1aa935f2-3f36-4b8f-869c-ac4697eb1add', 'affiliate_2_p6c2@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 2', 'affiliate', '50e8f3dd-08e4-47b4-81ed-199b5403689b', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('50e8f3dd-08e4-47b4-81ed-199b5403689b', 'Empresa Masiva 2 C.A.', 'J-740002', 'affiliate_2_p6c2@example.com', 'Aragua', 'Caracas');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('50e8f3dd-08e4-47b4-81ed-199b5403689b', 'affiliate_2_p6c2@example.com', 'Carabobo', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('50e8f3dd-08e4-47b4-81ed-199b5403689b', 'Transferencia', 'PAGO-475431', 55, 'USD', 'approved');

-- Registro 3: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('40eab623-dfaf-48fc-959b-2ed8dc11fc2a', 'juridica', 'estandar', 'semestral', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('a83da697-32fd-4112-b343-c70775b20f85', 'affiliate_3_vq1f@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 3', 'affiliate', '40eab623-dfaf-48fc-959b-2ed8dc11fc2a', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('40eab623-dfaf-48fc-959b-2ed8dc11fc2a', 'Empresa Masiva 3 C.A.', 'J-770003', 'affiliate_3_vq1f@example.com', 'Distrito Capital', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('40eab623-dfaf-48fc-959b-2ed8dc11fc2a', 'affiliate_3_vq1f@example.com', 'Lara', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('40eab623-dfaf-48fc-959b-2ed8dc11fc2a', 'Transferencia', 'PAGO-512456', 368, 'USD', 'approved');

-- Registro 4: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('0f959914-9485-44d4-ba78-70dc1321678c', 'emprendedor', 'estandar', 'anual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('dfaf92a1-2628-4569-b012-976b4dae1164', 'affiliate_4_8b5m@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 4', 'affiliate', '0f959914-9485-44d4-ba78-70dc1321678c', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('0f959914-9485-44d4-ba78-70dc1321678c', 'Emprendedor 4', 'Apellido 4', '210004', 'Proyecto Innova 4', 'affiliate_4_8b5m@example.com', 'Lara', 'Puerto La Cruz');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('0f959914-9485-44d4-ba78-70dc1321678c', 'affiliate_4_8b5m@example.com', 'Miranda', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('0f959914-9485-44d4-ba78-70dc1321678c', 'Transferencia', 'PAGO-593725', 480, 'USD', 'approved');

-- Registro 5: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('4576dd4b-dd8d-4466-9f17-b32871744eeb', 'juridica', 'premium', 'anual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('fc6638d5-d0a6-400a-a1d7-960f0481ede0', 'affiliate_5_tgc3@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 5', 'affiliate', '4576dd4b-dd8d-4466-9f17-b32871744eeb', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('4576dd4b-dd8d-4466-9f17-b32871744eeb', 'Empresa Masiva 5 C.A.', 'J-180005', 'affiliate_5_tgc3@example.com', 'Aragua', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('4576dd4b-dd8d-4466-9f17-b32871744eeb', 'affiliate_5_tgc3@example.com', 'Bolívar', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('4576dd4b-dd8d-4466-9f17-b32871744eeb', 'Transferencia', 'PAGO-205291', 399, 'USD', 'approved');

-- Registro 6: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('6b4d35dc-1dfd-479e-9073-71f097de33a6', 'juridica', 'basico', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('d5566a96-02d6-436f-b0eb-921e88c913be', 'affiliate_6_zlux@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 6', 'affiliate', '6b4d35dc-1dfd-479e-9073-71f097de33a6', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('6b4d35dc-1dfd-479e-9073-71f097de33a6', 'Empresa Masiva 6 C.A.', 'J-660006', 'affiliate_6_zlux@example.com', 'Zulia', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('6b4d35dc-1dfd-479e-9073-71f097de33a6', 'affiliate_6_zlux@example.com', 'Carabobo', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('6b4d35dc-1dfd-479e-9073-71f097de33a6', 'Transferencia', 'PAGO-919334', 473, 'USD', 'approved');

-- Registro 7: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('9b26ca86-deb4-442c-9c5d-c45e3c25f26a', 'natural', 'basico', 'anual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('1682cd16-9617-488d-9ffa-f2146a7ca9e2', 'affiliate_7_f4da@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 7', 'affiliate', '9b26ca86-deb4-442c-9c5d-c45e3c25f26a', 1);
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado, ciudad) VALUES ('9b26ca86-deb4-442c-9c5d-c45e3c25f26a', 'Nombre 7', 'Apellido 7', 'V190007', 'affiliate_7_f4da@example.com', 'Lara', 'Caracas');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('9b26ca86-deb4-442c-9c5d-c45e3c25f26a', 'affiliate_7_f4da@example.com', 'Miranda', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('9b26ca86-deb4-442c-9c5d-c45e3c25f26a', 'Transferencia', 'PAGO-223050', 170, 'USD', 'approved');

-- Registro 8: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('0c9a1826-2b6f-4fda-b9a7-f6cb59313990', 'juridica', 'estandar', 'anual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('3cfedf27-82ef-4a97-8ba1-fe756cffc446', 'affiliate_8_8ku5@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 8', 'affiliate', '0c9a1826-2b6f-4fda-b9a7-f6cb59313990', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('0c9a1826-2b6f-4fda-b9a7-f6cb59313990', 'Empresa Masiva 8 C.A.', 'J-580008', 'affiliate_8_8ku5@example.com', 'Miranda', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('0c9a1826-2b6f-4fda-b9a7-f6cb59313990', 'affiliate_8_8ku5@example.com', 'Miranda', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('0c9a1826-2b6f-4fda-b9a7-f6cb59313990', 'Transferencia', 'PAGO-110892', 210, 'USD', 'approved');

-- Registro 9: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('2177b896-8512-4c19-8480-ed29f037aba2', 'emprendedor', 'premium', 'mensual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('5210b337-6f23-4609-afc0-cb33840d7dc1', 'affiliate_9_7a63@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 9', 'affiliate', '2177b896-8512-4c19-8480-ed29f037aba2', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('2177b896-8512-4c19-8480-ed29f037aba2', 'Emprendedor 9', 'Apellido 9', '120009', 'Proyecto Innova 9', 'affiliate_9_7a63@example.com', 'Carabobo', 'Maracaibo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('2177b896-8512-4c19-8480-ed29f037aba2', 'affiliate_9_7a63@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('2177b896-8512-4c19-8480-ed29f037aba2', 'Transferencia', 'PAGO-751012', 340, 'USD', 'approved');

-- Registro 10: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('1f94da78-2250-4cb4-bed7-99965890251a', 'natural', 'basico', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('f686191c-7e96-4e6c-8d8c-cb63ff4ee953', 'affiliate_10_qs6s@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 10', 'affiliate', '1f94da78-2250-4cb4-bed7-99965890251a', 1);
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado, ciudad) VALUES ('1f94da78-2250-4cb4-bed7-99965890251a', 'Nombre 10', 'Apellido 10', 'V1500010', 'affiliate_10_qs6s@example.com', 'Aragua', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('1f94da78-2250-4cb4-bed7-99965890251a', 'affiliate_10_qs6s@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('1f94da78-2250-4cb4-bed7-99965890251a', 'Transferencia', 'PAGO-323707', 282, 'USD', 'approved');

-- Registro 11: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('4661816a-3519-477f-8337-3dc82924773d', 'natural', 'premium', 'semestral', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('f872dfd4-22dd-4cb5-ad7e-ee73dc31dce3', 'affiliate_11_o8uv@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 11', 'affiliate', '4661816a-3519-477f-8337-3dc82924773d', 1);
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado, ciudad) VALUES ('4661816a-3519-477f-8337-3dc82924773d', 'Nombre 11', 'Apellido 11', 'V1300011', 'affiliate_11_o8uv@example.com', 'Bolívar', 'Puerto La Cruz');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('4661816a-3519-477f-8337-3dc82924773d', 'affiliate_11_o8uv@example.com', 'Carabobo', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('4661816a-3519-477f-8337-3dc82924773d', 'Transferencia', 'PAGO-472540', 329, 'USD', 'approved');

-- Registro 12: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('f1200811-3f3e-47c0-8850-124803444377', 'firma_personal', 'estandar', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('05e844b1-d175-43c9-af7c-d2840910a8eb', 'affiliate_12_yz1e@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 12', 'affiliate', 'f1200811-3f3e-47c0-8850-124803444377', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('f1200811-3f3e-47c0-8850-124803444377', 'Firma Masiva 12', 'V-1600012', 'affiliate_12_yz1e@example.com', 'Miranda', 'Maracaibo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('f1200811-3f3e-47c0-8850-124803444377', 'affiliate_12_yz1e@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('f1200811-3f3e-47c0-8850-124803444377', 'Transferencia', 'PAGO-650207', 109, 'USD', 'approved');

-- Registro 13: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('d122c9c7-9986-4d94-bec5-fd0de63de4d7', 'ente_gubernamental', 'basico', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('d103466d-83ae-417e-8459-c35e38d0dd7a', 'affiliate_13_wjdk@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 13', 'affiliate', 'd122c9c7-9986-4d94-bec5-fd0de63de4d7', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('d122c9c7-9986-4d94-bec5-fd0de63de4d7', 'Institución Pública 13', 'G-2000013', 'affiliate_13_wjdk@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('d122c9c7-9986-4d94-bec5-fd0de63de4d7', 'affiliate_13_wjdk@example.com', 'Bolívar', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('d122c9c7-9986-4d94-bec5-fd0de63de4d7', 'Transferencia', 'PAGO-698985', 416, 'USD', 'approved');

-- Registro 14: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('fd960560-b9b4-4d69-8b1f-599b7e9177b6', 'juridica', 'premium', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('94579bcf-61cc-4edd-962f-b7da5007f5b0', 'affiliate_14_kom1@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 14', 'affiliate', 'fd960560-b9b4-4d69-8b1f-599b7e9177b6', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('fd960560-b9b4-4d69-8b1f-599b7e9177b6', 'Empresa Masiva 14 C.A.', 'J-6300014', 'affiliate_14_kom1@example.com', 'Zulia', 'Maracaibo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('fd960560-b9b4-4d69-8b1f-599b7e9177b6', 'affiliate_14_kom1@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('fd960560-b9b4-4d69-8b1f-599b7e9177b6', 'Transferencia', 'PAGO-992670', 119, 'USD', 'approved');

-- Registro 15: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('98c2a987-980f-44aa-a973-5846f8bfddfb', 'emprendedor', 'basico', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('b009dc4a-96d2-4817-a2d2-5c90f2ae899f', 'affiliate_15_x0ca@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 15', 'affiliate', '98c2a987-980f-44aa-a973-5846f8bfddfb', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('98c2a987-980f-44aa-a973-5846f8bfddfb', 'Emprendedor 15', 'Apellido 15', '1800015', 'Proyecto Innova 15', 'affiliate_15_x0ca@example.com', 'Bolívar', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('98c2a987-980f-44aa-a973-5846f8bfddfb', 'affiliate_15_x0ca@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('98c2a987-980f-44aa-a973-5846f8bfddfb', 'Transferencia', 'PAGO-819363', 218, 'USD', 'approved');

-- Registro 16: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('8f357562-5519-410a-960d-12cec44691b2', 'firma_personal', 'premium', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('dd764248-6983-45d6-a7ac-440da0579eb3', 'affiliate_16_g2ep@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 16', 'affiliate', '8f357562-5519-410a-960d-12cec44691b2', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('8f357562-5519-410a-960d-12cec44691b2', 'Firma Masiva 16', 'V-2000016', 'affiliate_16_g2ep@example.com', 'Lara', 'Maracaibo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('8f357562-5519-410a-960d-12cec44691b2', 'affiliate_16_g2ep@example.com', 'Distrito Capital', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('8f357562-5519-410a-960d-12cec44691b2', 'Transferencia', 'PAGO-701119', 154, 'USD', 'approved');

-- Registro 17: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('9adf5e4d-aefe-45f4-8f08-2e290f28c735', 'natural', 'estandar', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('ec3d8c95-0506-4f3e-9810-f3c2aab6f3bc', 'affiliate_17_svj5@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 17', 'affiliate', '9adf5e4d-aefe-45f4-8f08-2e290f28c735', 1);
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado, ciudad) VALUES ('9adf5e4d-aefe-45f4-8f08-2e290f28c735', 'Nombre 17', 'Apellido 17', 'V1100017', 'affiliate_17_svj5@example.com', 'Distrito Capital', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('9adf5e4d-aefe-45f4-8f08-2e290f28c735', 'affiliate_17_svj5@example.com', 'Aragua', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('9adf5e4d-aefe-45f4-8f08-2e290f28c735', 'Transferencia', 'PAGO-948411', 427, 'USD', 'approved');

-- Registro 18: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('8073d011-4d88-452b-b7a3-bbea65a9ccf0', 'emprendedor', 'premium', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('0681ce51-8976-4299-880f-29526c6432cb', 'affiliate_18_v3ut@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 18', 'affiliate', '8073d011-4d88-452b-b7a3-bbea65a9ccf0', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('8073d011-4d88-452b-b7a3-bbea65a9ccf0', 'Emprendedor 18', 'Apellido 18', '1400018', 'Proyecto Innova 18', 'affiliate_18_v3ut@example.com', 'Anzoátegui', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('8073d011-4d88-452b-b7a3-bbea65a9ccf0', 'affiliate_18_v3ut@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('8073d011-4d88-452b-b7a3-bbea65a9ccf0', 'Transferencia', 'PAGO-363827', 404, 'USD', 'approved');

-- Registro 19: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('114d8391-18f3-4773-85cf-dd262dfbb16a', 'ente_gubernamental', 'premium', 'semestral', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('898bdba4-355c-4cba-b75c-6844e7de90e9', 'affiliate_19_qpko@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 19', 'affiliate', '114d8391-18f3-4773-85cf-dd262dfbb16a', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('114d8391-18f3-4773-85cf-dd262dfbb16a', 'Institución Pública 19', 'G-2000019', 'affiliate_19_qpko@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('114d8391-18f3-4773-85cf-dd262dfbb16a', 'affiliate_19_qpko@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('114d8391-18f3-4773-85cf-dd262dfbb16a', 'Transferencia', 'PAGO-255036', 364, 'USD', 'approved');

-- Registro 20: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('dbe4bfa0-19b7-427f-8724-244f0142b040', 'emprendedor', 'premium', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('8b6932af-0063-49c2-98a1-781b9487f09d', 'affiliate_20_qr0b@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 20', 'affiliate', 'dbe4bfa0-19b7-427f-8724-244f0142b040', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('dbe4bfa0-19b7-427f-8724-244f0142b040', 'Emprendedor 20', 'Apellido 20', '1200020', 'Proyecto Innova 20', 'affiliate_20_qr0b@example.com', 'Anzoátegui', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('dbe4bfa0-19b7-427f-8724-244f0142b040', 'affiliate_20_qr0b@example.com', 'Carabobo', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('dbe4bfa0-19b7-427f-8724-244f0142b040', 'Transferencia', 'PAGO-664653', 175, 'USD', 'approved');

-- Registro 21: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('39940b1f-e9dd-4011-9cd6-f2035a801397', 'juridica', 'estandar', 'mensual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('3e70d4fb-6b4e-4d75-83a8-fe13312b4cea', 'affiliate_21_gmze@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 21', 'affiliate', '39940b1f-e9dd-4011-9cd6-f2035a801397', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('39940b1f-e9dd-4011-9cd6-f2035a801397', 'Empresa Masiva 21 C.A.', 'J-6900021', 'affiliate_21_gmze@example.com', 'Carabobo', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('39940b1f-e9dd-4011-9cd6-f2035a801397', 'affiliate_21_gmze@example.com', 'Distrito Capital', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('39940b1f-e9dd-4011-9cd6-f2035a801397', 'Transferencia', 'PAGO-476361', 378, 'USD', 'approved');

-- Registro 22: NATURAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('2f2f725c-6ac3-4720-b543-d6eb64d52702', 'natural', 'basico', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('20c3e33e-6290-4a7a-a454-7af4d55ebde9', 'affiliate_22_0mxe@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 22', 'affiliate', '2f2f725c-6ac3-4720-b543-d6eb64d52702', 1);
INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado, ciudad) VALUES ('2f2f725c-6ac3-4720-b543-d6eb64d52702', 'Nombre 22', 'Apellido 22', 'V2100022', 'affiliate_22_0mxe@example.com', 'Miranda', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('2f2f725c-6ac3-4720-b543-d6eb64d52702', 'affiliate_22_0mxe@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('2f2f725c-6ac3-4720-b543-d6eb64d52702', 'Transferencia', 'PAGO-549630', 459, 'USD', 'approved');

-- Registro 23: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('cc8b68b2-bdc3-4799-b6e6-5cabe3266297', 'firma_personal', 'premium', 'anual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('bd7e34e6-5d91-4331-ae41-02dc08c5e6c3', 'affiliate_23_08y5@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 23', 'affiliate', 'cc8b68b2-bdc3-4799-b6e6-5cabe3266297', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('cc8b68b2-bdc3-4799-b6e6-5cabe3266297', 'Firma Masiva 23', 'V-3000023', 'affiliate_23_08y5@example.com', 'Distrito Capital', 'Caracas');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('cc8b68b2-bdc3-4799-b6e6-5cabe3266297', 'affiliate_23_08y5@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('cc8b68b2-bdc3-4799-b6e6-5cabe3266297', 'Transferencia', 'PAGO-176202', 275, 'USD', 'approved');

-- Registro 24: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('bee03586-4151-45a0-bd30-a951ca26c714', 'juridica', 'premium', 'semestral', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('3833f69b-0e09-4559-b58c-3c039f0d3fba', 'affiliate_24_svb2@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 24', 'affiliate', 'bee03586-4151-45a0-bd30-a951ca26c714', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('bee03586-4151-45a0-bd30-a951ca26c714', 'Empresa Masiva 24 C.A.', 'J-5900024', 'affiliate_24_svb2@example.com', 'Anzoátegui', 'Puerto La Cruz');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('bee03586-4151-45a0-bd30-a951ca26c714', 'affiliate_24_svb2@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('bee03586-4151-45a0-bd30-a951ca26c714', 'Transferencia', 'PAGO-652624', 302, 'USD', 'approved');

-- Registro 25: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('038cd1ed-be17-49c5-b24f-4e7ef6688e03', 'emprendedor', 'estandar', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('527ed0cb-1b2f-46a1-91d7-e97d19aceb7d', 'affiliate_25_m1fl@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 25', 'affiliate', '038cd1ed-be17-49c5-b24f-4e7ef6688e03', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('038cd1ed-be17-49c5-b24f-4e7ef6688e03', 'Emprendedor 25', 'Apellido 25', '2800025', 'Proyecto Innova 25', 'affiliate_25_m1fl@example.com', 'Aragua', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('038cd1ed-be17-49c5-b24f-4e7ef6688e03', 'affiliate_25_m1fl@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('038cd1ed-be17-49c5-b24f-4e7ef6688e03', 'Transferencia', 'PAGO-999865', 398, 'USD', 'approved');

-- Registro 26: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('8b44a7b6-bfe4-4aae-91f3-41ebbf2be613', 'emprendedor', 'premium', 'anual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('298a8d37-108d-4b09-8211-1f32a3543506', 'affiliate_26_kom0@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 26', 'affiliate', '8b44a7b6-bfe4-4aae-91f3-41ebbf2be613', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('8b44a7b6-bfe4-4aae-91f3-41ebbf2be613', 'Emprendedor 26', 'Apellido 26', '1100026', 'Proyecto Innova 26', 'affiliate_26_kom0@example.com', 'Lara', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('8b44a7b6-bfe4-4aae-91f3-41ebbf2be613', 'affiliate_26_kom0@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('8b44a7b6-bfe4-4aae-91f3-41ebbf2be613', 'Transferencia', 'PAGO-936442', 437, 'USD', 'approved');

-- Registro 27: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('cb88b066-0249-4584-8c70-50b81586bf10', 'firma_personal', 'basico', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('24dfc531-3a58-4592-a2be-bb4151d09f89', 'affiliate_27_qbe4@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 27', 'affiliate', 'cb88b066-0249-4584-8c70-50b81586bf10', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('cb88b066-0249-4584-8c70-50b81586bf10', 'Firma Masiva 27', 'V-2700027', 'affiliate_27_qbe4@example.com', 'Miranda', 'Maracaibo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('cb88b066-0249-4584-8c70-50b81586bf10', 'affiliate_27_qbe4@example.com', 'Lara', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('cb88b066-0249-4584-8c70-50b81586bf10', 'Transferencia', 'PAGO-461987', 446, 'USD', 'approved');

-- Registro 28: EMPRENDEDOR
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('aab2bfe1-29b3-4819-8579-2590a599b48c', 'emprendedor', 'premium', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('3d9a9460-9418-4f4c-8e91-a9fd4a27f900', 'affiliate_28_g3l7@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 28', 'affiliate', 'aab2bfe1-29b3-4819-8579-2590a599b48c', 1);
INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, correo_emprendedor, estado, ciudad) VALUES ('aab2bfe1-29b3-4819-8579-2590a599b48c', 'Emprendedor 28', 'Apellido 28', '3000028', 'Proyecto Innova 28', 'affiliate_28_g3l7@example.com', 'Miranda', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('aab2bfe1-29b3-4819-8579-2590a599b48c', 'affiliate_28_g3l7@example.com', 'Bolívar', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('aab2bfe1-29b3-4819-8579-2590a599b48c', 'Transferencia', 'PAGO-850122', 313, 'USD', 'approved');

-- Registro 29: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('524c9655-6dcb-4636-bd21-8fdf62107649', 'firma_personal', 'estandar', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('520c4346-d57c-4d3d-baaa-1b43d645fa7a', 'affiliate_29_cmsl@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 29', 'affiliate', '524c9655-6dcb-4636-bd21-8fdf62107649', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('524c9655-6dcb-4636-bd21-8fdf62107649', 'Firma Masiva 29', 'V-1100029', 'affiliate_29_cmsl@example.com', 'Aragua', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('524c9655-6dcb-4636-bd21-8fdf62107649', 'affiliate_29_cmsl@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('524c9655-6dcb-4636-bd21-8fdf62107649', 'Transferencia', 'PAGO-736694', 459, 'USD', 'approved');

-- Registro 30: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('d895e846-4962-4c3f-9c31-9127c2170824', 'juridica', 'estandar', 'mensual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('8a22c923-0c66-4259-a9a0-20d84e1ff59e', 'affiliate_30_py1c@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 30', 'affiliate', 'd895e846-4962-4c3f-9c31-9127c2170824', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('d895e846-4962-4c3f-9c31-9127c2170824', 'Empresa Masiva 30 C.A.', 'J-7400030', 'affiliate_30_py1c@example.com', 'Distrito Capital', 'Caracas');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('d895e846-4962-4c3f-9c31-9127c2170824', 'affiliate_30_py1c@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('d895e846-4962-4c3f-9c31-9127c2170824', 'Transferencia', 'PAGO-216054', 211, 'USD', 'approved');

-- Registro 31: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('96c5fcf3-cbed-4515-a6f4-c1ee78596189', 'firma_personal', 'estandar', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('c28bdd63-7d34-4aa3-9908-89365732c40b', 'affiliate_31_o6ti@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 31', 'affiliate', '96c5fcf3-cbed-4515-a6f4-c1ee78596189', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('96c5fcf3-cbed-4515-a6f4-c1ee78596189', 'Firma Masiva 31', 'V-2600031', 'affiliate_31_o6ti@example.com', 'Miranda', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('96c5fcf3-cbed-4515-a6f4-c1ee78596189', 'affiliate_31_o6ti@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('96c5fcf3-cbed-4515-a6f4-c1ee78596189', 'Transferencia', 'PAGO-337332', 355, 'USD', 'approved');

-- Registro 32: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('6d146675-315b-4ae6-b004-d5ad060c432e', 'firma_personal', 'estandar', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('04c7337d-bc1d-489b-84c5-907a12444488', 'affiliate_32_qkc0@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 32', 'affiliate', '6d146675-315b-4ae6-b004-d5ad060c432e', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('6d146675-315b-4ae6-b004-d5ad060c432e', 'Firma Masiva 32', 'V-2300032', 'affiliate_32_qkc0@example.com', 'Distrito Capital', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('6d146675-315b-4ae6-b004-d5ad060c432e', 'affiliate_32_qkc0@example.com', 'Zulia', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('6d146675-315b-4ae6-b004-d5ad060c432e', 'Transferencia', 'PAGO-220291', 135, 'USD', 'approved');

-- Registro 33: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('be54c66e-65ac-4681-b59d-dd5319057394', 'ente_gubernamental', 'basico', 'semestral', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('4f51f663-8755-4ac2-b00c-2481aadb898a', 'affiliate_33_wed4@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 33', 'affiliate', 'be54c66e-65ac-4681-b59d-dd5319057394', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('be54c66e-65ac-4681-b59d-dd5319057394', 'Institución Pública 33', 'G-2000033', 'affiliate_33_wed4@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('be54c66e-65ac-4681-b59d-dd5319057394', 'affiliate_33_wed4@example.com', 'Anzoátegui', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('be54c66e-65ac-4681-b59d-dd5319057394', 'Transferencia', 'PAGO-421457', 249, 'USD', 'approved');

-- Registro 34: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('6b1f180f-b4a9-41af-b92f-f69056e7bec9', 'ente_gubernamental', 'basico', 'mensual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('563bbd20-c8e3-4c4c-acff-89ecf35e8059', 'affiliate_34_r02g@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 34', 'affiliate', '6b1f180f-b4a9-41af-b92f-f69056e7bec9', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('6b1f180f-b4a9-41af-b92f-f69056e7bec9', 'Institución Pública 34', 'G-2000034', 'affiliate_34_r02g@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('6b1f180f-b4a9-41af-b92f-f69056e7bec9', 'affiliate_34_r02g@example.com', 'Lara', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('6b1f180f-b4a9-41af-b92f-f69056e7bec9', 'Transferencia', 'PAGO-526133', 75, 'USD', 'approved');

-- Registro 35: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('e0231a64-d97a-4ed0-b43b-52f1fe7e6831', 'ente_gubernamental', 'basico', 'mensual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('7a990fda-d5f5-49ce-beab-e396a7438a07', 'affiliate_35_u0oa@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 35', 'affiliate', 'e0231a64-d97a-4ed0-b43b-52f1fe7e6831', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('e0231a64-d97a-4ed0-b43b-52f1fe7e6831', 'Institución Pública 35', 'G-2000035', 'affiliate_35_u0oa@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('e0231a64-d97a-4ed0-b43b-52f1fe7e6831', 'affiliate_35_u0oa@example.com', 'Carabobo', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('e0231a64-d97a-4ed0-b43b-52f1fe7e6831', 'Transferencia', 'PAGO-118594', 256, 'USD', 'approved');

-- Registro 36: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('0d51a5ed-0184-4771-b140-ce127415541c', 'ente_gubernamental', 'premium', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('f67eac63-d9ae-4b32-b5e0-4e3f93d788ba', 'affiliate_36_nhgc@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 36', 'affiliate', '0d51a5ed-0184-4771-b140-ce127415541c', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('0d51a5ed-0184-4771-b140-ce127415541c', 'Institución Pública 36', 'G-2000036', 'affiliate_36_nhgc@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('0d51a5ed-0184-4771-b140-ce127415541c', 'affiliate_36_nhgc@example.com', 'Distrito Capital', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('0d51a5ed-0184-4771-b140-ce127415541c', 'Transferencia', 'PAGO-710810', 56, 'USD', 'approved');

-- Registro 37: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('5489eb71-b9d2-43d1-9f47-bd2f8017fa41', 'juridica', 'premium', 'mensual', 'pending');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('b8217328-03b6-4e04-a77d-208e2b71708f', 'affiliate_37_2cqv@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 37', 'affiliate', '5489eb71-b9d2-43d1-9f47-bd2f8017fa41', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('5489eb71-b9d2-43d1-9f47-bd2f8017fa41', 'Empresa Masiva 37 C.A.', 'J-5300037', 'affiliate_37_2cqv@example.com', 'Zulia', 'Valencia');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('5489eb71-b9d2-43d1-9f47-bd2f8017fa41', 'affiliate_37_2cqv@example.com', 'Bolívar', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('5489eb71-b9d2-43d1-9f47-bd2f8017fa41', 'Transferencia', 'PAGO-620595', 229, 'USD', 'approved');

-- Registro 38: ENTE_GUBERNAMENTAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('de403cc9-0cde-4532-b6b9-758a4778b684', 'ente_gubernamental', 'estandar', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('2e16ecb2-1d8d-44a7-959d-f5c395f2d88a', 'affiliate_38_oie7@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 38', 'affiliate', 'de403cc9-0cde-4532-b6b9-758a4778b684', 1);
INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ('de403cc9-0cde-4532-b6b9-758a4778b684', 'Institución Pública 38', 'G-2000038', 'affiliate_38_oie7@example.com');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('de403cc9-0cde-4532-b6b9-758a4778b684', 'affiliate_38_oie7@example.com', 'Distrito Capital', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('de403cc9-0cde-4532-b6b9-758a4778b684', 'Transferencia', 'PAGO-228646', 436, 'USD', 'approved');

-- Registro 39: JURIDICA
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('e198d42e-2035-409a-88d6-9ea8e13d5a2c', 'juridica', 'estandar', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('82c51a11-f1a3-4f63-b990-8a89d7120af6', 'affiliate_39_dmnx@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 39', 'affiliate', 'e198d42e-2035-409a-88d6-9ea8e13d5a2c', 1);
INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado, ciudad) VALUES ('e198d42e-2035-409a-88d6-9ea8e13d5a2c', 'Empresa Masiva 39 C.A.', 'J-4700039', 'affiliate_39_dmnx@example.com', 'Miranda', 'Maracay');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('e198d42e-2035-409a-88d6-9ea8e13d5a2c', 'affiliate_39_dmnx@example.com', 'Lara', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('e198d42e-2035-409a-88d6-9ea8e13d5a2c', 'Transferencia', 'PAGO-428330', 302, 'USD', 'approved');

-- Registro 40: FIRMA_PERSONAL
INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('8fe73eb5-30b6-4a4e-8935-02101a7a08d4', 'firma_personal', 'basico', 'anual', 'active');
INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('3e58c289-a499-4316-b576-3416ae0914de', 'affiliate_40_p9g7@example.com', '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7', 'Prueba 40', 'affiliate', '8fe73eb5-30b6-4a4e-8935-02101a7a08d4', 1);
INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado, ciudad) VALUES ('8fe73eb5-30b6-4a4e-8935-02101a7a08d4', 'Firma Masiva 40', 'V-1600040', 'affiliate_40_p9g7@example.com', 'Carabobo', 'Maracaibo');
INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica, canales_venta) VALUES ('8fe73eb5-30b6-4a4e-8935-02101a7a08d4', 'affiliate_40_p9g7@example.com', 'Miranda', 'Comercio General', '["web", "fisico"]'::jsonb);
INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ('8fe73eb5-30b6-4a4e-8935-02101a7a08d4', 'Transferencia', 'PAGO-983282', 162, 'USD', 'approved');

COMMIT;