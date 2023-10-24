module.exports = function isGuest(req, res, next) {
	
	const usuario = req.session.usuario
	if (!usuario) {
		return res.redirect("/auth/login");
	}
	next();
}