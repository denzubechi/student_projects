export default function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
      // User is authenticated and is an admin, allow access to the protected route
      return next();
    }
    // User is not an admin or not authenticated, send an unauthorized response
    res.status(403).json({ message: 'Unauthorized - Admin access required' });
  }
  