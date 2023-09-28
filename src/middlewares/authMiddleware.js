const db = require('../database/models');
const User = db.Users;

function authMiddleware(req, res, next) {
	//console.log("check1",req.session.usuario);
	//console.log(req.cookies);
	//console.log("locals",req.locals.usuario);
	if (!req.session.usuario) {
		return res.redirect('/auth/login');
	} else {
		//console.log("check2");
		res.locals.usuario = req.session.usuario;
		if(req.cookies.email){
			let email = req.cookies.email
			//console.log("check3");
			User.findOne({
				where: {
				email: email
				}
			})
			.then(usuario =>{
			console.log("check4",usuario);
			req.session.usuario = usuario;
			res.locals.usuario = usuario;			
			})
		}
	}
return next();
}

module.exports = authMiddleware;