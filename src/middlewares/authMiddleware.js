function authMiddleware(req, res, next) {
	if (!req.session.usuario) {
		return res.redirect('/auth/login');
	}
	next();
}

module.exports = authMiddleware;