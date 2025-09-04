
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Tareas',
      version: '1.0.0',
      description: 'Una API simple para gestionar tareas, creada para una prueba técnica.',
    },
    servers: [{ url: 'http://localhost:3000' }],
    tags: [
      { name: 'Auth', description: "<h1>Endpoints de Autenticación<h1>" },
      { name: 'Tasks', description: '<h1>Endpoints de Tareas<h1>' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // AQUÍ DEFINIMOS TODAS LAS RUTAS MANUALMENTE
    paths: {
      
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Registra un nuevo usuario',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Usuario registrado' },
            '400': { description: 'Error de validación' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Inicia sesión y obtiene un token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Token JWT',
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { token: { type: 'string' } } },
                },
              },
            },
            '400': { description: 'Credenciales inválidas' },
          },
        },
      },
     
      '/api/tasks': {
        post: {
          tags: ['Tasks'],
          summary: 'Crea una nueva tarea',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title'],
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Tarea creada' },
            '401': { description: 'No autorizado' },
          },
        },
        get: {
          tags: ['Tasks'],
          summary: 'Obtiene las tareas del usuario',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': { description: 'Lista de tareas' },
            '401': { description: 'No autorizado' },
          },
        },
      },
      '/api/tasks/{id}': {
        put: {
          tags: ['Tasks'],
          summary: 'Actualiza una tarea por ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['pendiente', 'en progreso', 'completada'] },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Tarea actualizada' },
            '401': { description: 'No autorizado' },
            '404': { description: 'Tarea no encontrada' },
          },
        },
        delete: {
          tags: ['Tasks'],
          summary: 'Elimina una tarea por ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            '200': { description: 'Tarea eliminada' },
            '401': { description: 'No autorizado' },
            '404': { description: 'Tarea no encontrada' },
          },
        },
      },
    },
  },
  
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;