# API de Gestión de Tareas 

API fue desarrollada como parte de una prueba técnica para la vacante, construida con Node.js, Express, y TypeScript. La aplicación permite a los usuarios gestionar un listado de tareas personales de forma segura, con un sistema de autenticación y autorización basado en JSON Web Tokens (JWT).

## Características Principales

**Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión.
**Autorización con JWT:** Rutas protegidas que aseguran que los usuarios solo puedan acceder a sus propios datos.
**Gestión CRUD de Tareas:** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar tareas.
**Validación de Entradas:** Reglas de validación para asegurar la integridad de los datos recibidos.
**Documentación Interactiva:** Endpoints documentados con Swagger para facilitar las pruebas y la comprensión de la API.

**Tecnologías Utilizadas**

* **Backend:** Node.js, Express.js
* **Lenguaje:** TypeScript
* **Base de Datos:** MongoDB (con Mongoose como ODM)
* **Autenticación:** JSON Web Tokens (`jsonwebtoken`)
* **Encriptación:** `bcrypt.js` para el hasheo de contraseñas
* **Validación:** `express-validator`
* **Documentación:** `swagger-jsdoc` y `swagger-ui-express`

**Requisitos Previos**

Para ejecutar este proyecto, necesitarás tener instalado lo siguiente en tu máquina local:

* Node.js (versión 18 o superior recomendada)
* npm (generalmente se instala con Node.js)
* Una URI de conexión de MongoDB. Puedes obtener una gratis desde [MongoDB Atlas]

##  Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto:

### 1. Clonar el repositorio
`
git clone [https://github.com/StivenParra2001/ProyectoPractica](https://github.com/StivenParra2001/ProyectoPractica)
```
*(Reemplaza `tu-usuario/tu-repositorio` con la URL de tu propio repositorio en GitHub)*

### 2. Navegar al directorio

cd nombre-del-repositorio
```

### 3. Instalar dependencias
Este comando leerá el archivo `package.json` e instalará todas las librerías necesarias.

npm install
```

### 4. Configurar variables de entorno
Crea un archivo llamado `.env` en la raíz del proyecto. Este archivo contendrá las claves secretas que la aplicación necesita para funcionar.
```
MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
JWT_SECRET=una_frase_secreta_larga_y_segura_para_firmar_tokens
```
* **`MONGO_URI`**: La cadena de conexión a tu base de datos de MongoDB.
* **`JWT_SECRET`**: Una frase secreta de tu elección para firmar los tokens de autenticación.

## ▶Ejecución

Una vez configurado, puedes iniciar el servidor en modo de desarrollo con el siguiente comando. `ts-node-dev` reiniciará automáticamente el servidor cada vez que guardes un cambio en el código.


npm run dev


La API estará disponible y escuchando peticiones en `http://localhost:3000`.

##  Documentación de la API

La documentación completa e interactiva de la API fue generada con Swagger. Una vez que el servidor esté corriendo, puedes acceder a ella y probar todos los endpoints desde tu navegador en la siguiente dirección:

[**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

##  Uso con Postman

A continuación se muestra un ejemplo del flujo de trabajo completo para interactuar con la API usando Postman.

### Paso 1: Registrar un Nuevo Usuario

Crea un usuario para poder interactuar con la API.

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/auth/register`
* **Body:** Selecciona la pestaña `Body` -> `raw` -> `JSON`.
* **Contenido:**
    json
    {
        "name": "Usuario de Prueba",
        "email": "prueba@correo.com",
        "password": "password123"
    }
    

### Paso 2: Iniciar Sesión y Obtener el Token

Usa las credenciales del usuario recién creado para iniciar sesión. La respuesta te dará el token JWT que necesitas para acceder a las rutas protegidas.

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/auth/login`
* **Body:** (`raw`, `JSON`)
    json
    {
        "email": "prueba@correo.com",
        "password": "password123"
    }
    
La respuesta será un objeto JSON que contiene el token. **Copia el valor del token** para el siguiente paso.

json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy..."
}


### Paso 3: Realizar una Petición Protegida (Ej: Crear una Tarea)

Ahora puedes usar el token para interactuar con los endpoints de tareas.

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/tasks`
* **Authorization:**
    1.  Ve a la pestaña Authorization.
    2.  En el menú desplegable "Type", selecciona Bearer Token.
    3.  Pega el token que copiaste en el campo "Token" de la derecha.
        
Body: (raw, JSON)
    json
    {
        "title": "Mi primera tarea",
        "description": "Esta es una tarea creada con Postman"
    }
    
 Haz clic en "Send". Deberías recibir una respuesta 201 Created con la tarea recién creada.

Importante Deberás usar esta misma configuración de **Authorization** para todas las demás peticiones a los endpoints de tareas (GET, PUT, DELETE).


Durante el desarrollo del proyecto, se utilizó un enfoque de commits atómicos y descriptivos, siguiendo la especificación de **Conventional Commits**. Esto permite mantener un historial de versiones limpio, legible y fácil de seguir.

Ejemplos de la secuencia de commits realizados:
 Configuración inicial del proyecto con Node.js, Express y TypeScript.
Implementación de la conexión a MongoDB con Mongoose.
 Creación de modelos User y Task con sus respectivos schemas.
Desarrollo de la lógica de registro y login de usuarios con JWT y bcrypt.
 Creación del middleware de autenticación para proteger rutas.
Implementación del CRUD completo y autorizado para las tareas.
 Adición de validaciones a las rutas de entrada con express-validator.
 Implementación de la documentación de la API con Swagger.
 Corrección de errores de análisis en la especificación de Swagger.
Simplificación de la sintaxis asíncrona a promesas .then/.catch.
 Finalización del README y configuración del git

### Uso de Asistentes de IA

Se utilizó un asistente de IA (Gemini) como herramienta de apoyo para acelerar el desarrollo, aprender nuevos conceptos y solucionar problemas complejos de manera eficiente. A continuación, se muestran ejemplos de los tipos de prompts utilizados durante el proceso:

###1. Configuración y Código Inicial
Dame los pasos y comandos para iniciar un proyecto desde cero con Node.js, Express y TypeScript, configurado para usar CommonJS.
*Muéstrame cómo crear un Schema de Mongoose para una tarea que incluya título, descripción, estado y una referencia a un usuario.

##2. Lógica Específica
*Escribe una función de controlador en Express para el login de un usuario. Debe buscar al usuario, comparar la contraseña con bcrypt.compare, y si es exitoso, generar un JWT.
*¿Cómo puedo crear un middleware en Express que lea un Bearer Token del encabezado Authorization y verifique su validez con jsonwebtoken?

## 3. Debugging (Solución de Errores)
*"Mi código de TypeScript me da el error `Cannot find namespace express. ¿Qué significa y cómo lo soluciono?
* Estoy recibiendo un error `404 Not Found - Cannot POST /api/tasks` aunque creo que mi ruta está bien definida. ¿Cuáles son las causas más comunes de este error en Express?"
* *"Mi página de Swagger carga pero muestra `No operations defined in spec!`. Mi configuración de `swagger-jsdoc` es la siguiente [...]. ¿Qué podría estar causando este problema de análisis?"*

#### 4. Documentación y Refactorización
* *"enera un bloque de comentarios JSDoc para Swagger que documente un endpoint `PUT` para actualizar una tarea, incluyendo un parámetro de ruta 'id' y el cuerpo de la petición."
