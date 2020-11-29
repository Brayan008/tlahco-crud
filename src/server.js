const { urlencoded } = require('express');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');//Para la peticion delete
const flash = require('connect-flash');
const session = require('express-session');
const passport  = require('passport');

//Initializations
const app = express();
require('./config/passport');

//Setting
app.set('port', process.env.PORT || 4000); //Obtener el puerto de server, si este no existe que sea 4000
app.set('views', path.join(__dirname, 'views'));//Decirle a node donde esta la carpeta views, con path y _dirname
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));//Configurar motor de plantillas
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Configuracion para los formularios
app.use(methodOverride('_method')); //Para el metodo eliminar y actualizar
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables <-Variables globales
app.use((req, res, next)=>{
    res.locals.success_cmt = req.flash('success_cmt');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/comentarios.routes'));
app.use(require('./routes/users.routes'));


//Static files <- son archivos que cualquier aplicacion cliente 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.render("404");
  });

module.exports = app;