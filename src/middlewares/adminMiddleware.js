function adminMiddleware(req, res, next) {
	res.locals.isLogged = false;
	if (req.session.usuario) {
		res.locals.isLogged = true;
		res.locals.usuario === req.session.usuario;
		if (res.locals.usuario.role !==1) {
			return res.send('no tienes permisos de administrador');
		} 
	}
	next();
}

module.exports = adminMiddleware;