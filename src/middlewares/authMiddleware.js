const db = require('../database/models');
const User = db.Users;

function authMiddleware(req, res, next) {
	if (!req.session.usuario) {
		return res.redirect('/auth/login');
	} else {
		res.locals.usuario = req.session.usuario;
		if(req.cookies.email){
			let email = req.cookies.email
			User.findOne({
				where: {
				email: email
				}
			})
			.then(usuario =>{
			req.session.usuario = usuario;
			res.locals.usuario = usuario;			
			})
		}
	}
return next();
}

module.exports = authMiddleware;