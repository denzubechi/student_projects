export default function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // User is authenticated, allow access to the protected route
      return next();
    }
    // User is not authenticated, redirect to the login page or send an unauthorized response
    res.redirect('/login'); // You can customize this to handle authentication as needed
  } 