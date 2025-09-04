
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  // La tarea debe estar asociada a un usuario
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    // Solo permitimos estos tres estados
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente', 
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Task', TaskSchema);