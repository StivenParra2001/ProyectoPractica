
const { Request } = require('express');
import type { Response } from 'express';
const express = require('express');

//Imports para Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;



// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('API de Tareas funcionando!');
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});