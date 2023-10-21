function adminMiddleware(req, res, next) {
	const usuario = req.session.usuario
	if (usuario) {
		
		if (usuario.roles.roleName.toUpperCase() == "USUARIO") {
			return res.send('no tienes permisos de administrador');
		} 
	}else{
		return res.redirect('/');

	}
	next();
}

module.exports = adminMiddleware;