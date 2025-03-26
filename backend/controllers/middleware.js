import jwt from 'jsonwebtoken';

export const authenticated = (requiredRole) => {
  return (req, res, next) => {
    // Try to get the token from the Authorization header or cookies
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.access_token;
    
    // If there's no token, return an error
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Make sure to use the correct secret key
      req.user = decoded; // Attach user info (id, role) to the request

      // Check if the user has the required role
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }

      next(); // User is authenticated and authorized
    } catch (error) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
  };
};
