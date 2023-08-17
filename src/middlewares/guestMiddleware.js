function guestMiddleware(req, res, next) {
	if (req.session.usuario) {
		return res.redirect('/auth/profile');
	}
	next();
}

module.exports = guestMiddleware;