// checks if a user authenticated and can access the page
export function isAuthenticated(req, res, next) {
    if(req.session && req.session.userId)
        return next();
    else {
        const errText = "You must be logged in to view this page.";
        return next(res.json({errText}));
    }
}

// checks if the user is alread logged in and redirects him away from
// login and register page
export function isAlreadyLoggedIn(req, res, next) {
    if(req.session && req.session.userId)
        return res.redirect('/users/');
    else 
        return next();
}
