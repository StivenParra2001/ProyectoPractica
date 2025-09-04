
const { Response } = require('express');
type Response = import('express').Response;
const Task = require('../models/Task');

// Crear una nueva tarea
const createTask = async (req: any, res: Response) => {
  
  const body: any = req.body;
  const { title, description, status, dueDate } = body;
  
  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id // Obtenemos el ID del usuario del middleware
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener todas las tareas del usuario logueado
const getTasks = async (req: any, res: Response) => {
  try {
    // Buscamos solo las tareas que le pertenecen al usuario
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una tarea
const updateTask = async (req: any, res: Response) => {
  const body: any = req.body;
  const { title, description, status, dueDate } = body;
  
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    // Verificación: ¿Esta tarea le pertenece al usuario?
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acción no autorizada' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status, dueDate } },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una tarea
const deleteTask = async (req: any, res: Response) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    // Verificación: ¿Esta tarea le pertenece al usuario?
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acción no autorizada' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Tarea eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};