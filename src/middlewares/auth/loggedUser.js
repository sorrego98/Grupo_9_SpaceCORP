module.exports = loggedUser = (req, res, next) => {
	
	if (req.session.usuario) {
		return res.redirect('/auth/profile');
	}
	next();
};