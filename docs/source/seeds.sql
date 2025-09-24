-- Seeds mínimas para testing y demo
-- Archivo: docs/source/seeds.sql

-- Insertar algunos sujetos de ejemplo
INSERT INTO "Sujeto" (spo_cuit, spo_denominacion) VALUES
('20329642365', 'RODRIGUEZ JUAN CARLOS'),
('27123456789', 'MARTINEZ MARIA ELENA'),
('23987654321', 'GOMEZ AUTOVENTAS S.A.');

-- Insertar algunos automotores de ejemplo
-- 1. Crear objetos de valor
INSERT INTO "Objeto_De_Valor" (ovp_tipo, ovp_codigo, ovp_descripcion) VALUES
('AUTOMOTOR', 'ABC123', 'Automotor ABC123'),
('AUTOMOTOR', 'AB123CD', 'Automotor AB123CD'),
('AUTOMOTOR', 'XYZ999', 'Automotor XYZ999');

-- 2. Insertar automotores
INSERT INTO "Automotores" (atr_ovp_id, atr_dominio, atr_numero_chasis, atr_numero_motor, atr_color, atr_fecha_fabricacion)
SELECT ovp_id, 'ABC123', 'CH123456789', 'MT987654321', 'AZUL', 202001
FROM "Objeto_De_Valor" WHERE ovp_codigo = 'ABC123';

INSERT INTO "Automotores" (atr_ovp_id, atr_dominio, atr_numero_chasis, atr_numero_motor, atr_color, atr_fecha_fabricacion)
SELECT ovp_id, 'AB123CD', 'CH111222333', 'MT444555666', 'ROJO', 201912
FROM "Objeto_De_Valor" WHERE ovp_codigo = 'AB123CD';

-- 3. Asignar dueños (vínculos)
INSERT INTO "Vinculo_Sujeto_Objeto" (vso_ovp_id, vso_spo_id, vso_tipo_vinculo, vso_porcentaje, vso_responsable, vso_fecha_inicio)
SELECT o.ovp_id, s.spo_id, 'DUENO', 100, 'S', CURRENT_DATE
FROM "Objeto_De_Valor" o, "Sujeto" s 
WHERE o.ovp_codigo = 'ABC123' AND s.spo_cuit = '20329642365';

INSERT INTO "Vinculo_Sujeto_Objeto" (vso_ovp_id, vso_spo_id, vso_tipo_vinculo, vso_porcentaje, vso_responsable, vso_fecha_inicio)
SELECT o.ovp_id, s.spo_id, 'DUENO', 100, 'S', CURRENT_DATE
FROM "Objeto_De_Valor" o, "Sujeto" s 
WHERE o.ovp_codigo = 'AB123CD' AND s.spo_cuit = '27123456789';
