function loggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	if (req.session.usuario) {
		res.locals.isLogged = true;
		res.locals.usuario = req.session.usuario;
	}

	next();
}

module.exports = loggedMiddleware;