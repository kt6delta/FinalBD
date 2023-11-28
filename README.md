
# Bd_Web_Project

Proyecto donde se uniran oracle y node.js para hacer un registro de empleado con  validación

# INSTALACION

Se debe tener instalado **node.js, npm y slq plus (de oracle)**
Luego de tener esos programas instalados se debe crear una carpeta donde se contendra todo el codigo del proyecto, url del codigo: <https://github.com/kt6delta/FinalBD>

## librerias a instalar en Backend (node.js)

```bash
npm install cors
npm install express
npm install oracledb
npm instal pdfkit
npm run dev
```

## librerias a instalar en Frontend (Vue 3)

```bash
npm install vite@4.4.5
npm install vue-router@4
npm install bootstrap5
npm install vue-select@latest --save
```

# CONFIGURACION

- Primero se crea el usuario en oracle en este se caso sera **"BD182"**, donde puedes usar la contraseña que prefieras en este caso se usara prueba2
- Luego se crea un archivo *.env* contendra las configuraciones para conectarse a la base de datos en el computador local, la contraseña del nuevo usuario **"BD182"**, la ubicacion donde esta instalado el cliente de oracle y el puerto donde correra el programa

## ejemplo archivo *.env*

```bash
PASSWORD = prueba2
ORACLE_CLIENT = C:\Users\jhosd\Downloads\instantclient_19_21
PORT = 3000
```

# IMPLEMENTACION

## en la carpeta scirp_base

Se crea el modelo de la base de datos usando el archivo **"Clientes.sql"**
Se llenan las tablas creadas usando el archivo **"ScriptModulo.txt"**
En la carpeta contenedora se debe abrir una terminal y ejecutar el siguiente comando

```bash
npm run dev
```

Luego se debe abrir otra terminal y ejecutar el siguiente comando en la carpeta **Backend**

```bash
npm run serve
```
