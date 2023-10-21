module.exports = isUser = (req, res, next) => {
	
	const usuario = req.session.usuario
	if (req.session.usuario) {
		if (usuario.roles.roleName.toUpperCase() == "ADMINISTRADOR"){
			return res.redirect("/admin");
		
		}else{
			return res.redirect('/auth/profile');

		}
	}
	next();
};