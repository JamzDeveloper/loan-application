create database prestamos;
use prestamos;

CREATE TABLE persona (
    id_persona INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(8),
    celular VARCHAR(15),
    whatsapp VARCHAR(15),
    direccion VARCHAR(50),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id_persona)
);
CREATE TABLE rol (
    id_rol INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(65) NOT NULL,
    PRIMARY KEY (id_rol)
);
CREATE TABLE usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    id_persona INT NOT NULL,
    id_rol INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    clave VARCHAR(450) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_persona)
        REFERENCES persona (id_persona),
    FOREIGN KEY (id_rol)
        REFERENCES rol (id_rol)
);

CREATE TABLE prestamo (
    id_prestamo INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_persona INT NOT NULL,
    monto FLOAT,
    porcentaje FLOAT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    empenio VARCHAR(400),
    estado_prestamo VARCHAR(400),
    estado BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_prestamo),
    FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_persona)
        REFERENCES persona (id_persona)
);


CREATE TABLE pago (
    id_pago INT NOT NULL AUTO_INCREMENT,
    id_prestamo INT NOT NULL,
    monto FLOAT,
    fecha DATE NOT NULL,
    comentario VARCHAR(400),
    estado BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_pago),
    FOREIGN KEY (id_prestamo)
        REFERENCES prestamo (id_prestamo)
);

CREATE TABLE mensaje (
    id_mensaje INT NOT NULL AUTO_INCREMENT,
    id_prestamo INT NOT NULL,
    mensaje TEXT,
    PRIMARY KEY (id_mensaje),
    FOREIGN KEY (id_prestamo)
        REFERENCES prestamo (id_prestamo)
);

#------------------------------------------------------
insert rol values(2000,'ADMINISTRADOR');
insert rol values(3000,'USUARIO');

insert persona values(null,'jose','montenegro','78483923','938495065','000000000','guadalupe',true);
insert persona values(null,'abel','montenegro','78483923','938495065','000000000','guadalupe',true);


insert usuario values(null,1,3000,'jamz','jamzdeveloper',true);
insert usuario values(null,1,2000,'jamzdeveloper','jamzdeveloper',true);
insert prestamo values(null,1,1,5000.50,15,'2000-11-12','','moto linear color rojo de placa H4hjJ4224','pendiente',null);
insert prestamo values(null,1,1,4300.10,20.6,'2000-12-12','','reloj marca rolej y se guardo en la caja fuerte nuemro 2','pendiente',null);


insert pago values(null,1,200,'2021-11-12','se quedo pendiente 110',false);
insert pago values(null,2,110,'2021-11-13','se quedo pendiente 310',1);
insert pago values(null,1,220,'2021-11-14','se quedo pendiente 210',1);

select * from rol;
select * from persona;
select * from usuario;
select * from prestamo;
select * from pago;


