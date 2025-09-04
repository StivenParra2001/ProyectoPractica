

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("Error: La variable de entorno MONGO_URI no está definida.");
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB Conectado Exitosamente');

  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;