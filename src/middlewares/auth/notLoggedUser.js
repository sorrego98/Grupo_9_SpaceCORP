module.exports = notLoggedUser = (req, res, next) => {
	
	const usuario = req.session.usuario
	if (!usuario) {
		return res.redirect("/auth/login");
	}else{
		
		console.log(usuario.roles.roleName)
		if (usuario.roles.roleName.toUpperCase() == "ADMINISTRADOR"){
			return res.redirect("/admin");
		}
	} 
	next();
}