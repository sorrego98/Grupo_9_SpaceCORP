const db = require('../database/models')
const User = db.Users

module.exports = rememberedUser = (req, res, next) => {
	
	const email = req.cookies.email;
	if (req.cookies.email != undefined && req.session.usuario == undefined) {
		Users.findOne({
			include: [{association: 'roles'}],
			where:{email}
		  })
		  .then(user => {
				req.session.usuario = user; 
				return res.status(200).redirect('/auth/profile');            
			  
			  })
			
	}
	next();
};