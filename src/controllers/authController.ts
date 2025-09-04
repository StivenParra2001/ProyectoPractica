
const { Request } = require('express');
import type { Response } from 'express';


const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req: Request, res: Response) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.status(400).json({ errors: errors.array() });
  }

  
  const body: any = req.body;
  const { name, email, password } = body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};


const login = async (req: any, res: any) => {
  const body: any = req.body;
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (error: Error, token: string) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = {
  register,
  login,
};