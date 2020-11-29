const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User')

usersCtrl.signup = async (req, res)=>{
    const errors = [];
    const {name, email, password, confirm_pass} = req.body;
    if(password != confirm_pass){
        errors.push({text: 'Las contraseñas no coninciden.'});
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe tener mas de 4 digitos.'})
    }
    if(errors.length>0){
        res.render('index',{
            errors,
            name,
            email
        });
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'El correo ya esta en uso');
            res.redirect('../');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_cmt', 'Te has registrado correctamente - Ya puedes iniciar sesion');
            res.redirect('../');
        }
    }
};

 //Se va usar passport, se encarga de ver en cada vista si el usuario tiene autorizacion
usersCtrl.signin = passport.authenticate('local',{
    failureRedirect: '../',
    successRedirect: '/tlahco',
    failureFlash: true
    
});

usersCtrl.logout = (req, res)=>{
    req.logout();
    req.flash('success_cmt', 'Tu sesión fue cerrada exitosamente');
    res.redirect('../');
};

module.exports = usersCtrl;