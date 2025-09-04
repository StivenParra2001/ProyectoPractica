
const jwt = require('jsonwebtoken');


const authMiddleware = (req: any, res: any, next: any) => {
  // 1. Obtener el token del encabezado
  const authHeader = req.headers.authorization;

  // 2. Verificar si el token existe
  if (!authHeader) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  try {
    
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Formato de token inválido' });
    }
    
    // 3. Verificar la firma del token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Añadir los datos del usuario al objeto 'request'
    req.user = decoded.user;
    
  
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};

module.exports = authMiddleware;