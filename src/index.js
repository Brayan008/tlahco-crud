require('dotenv').config(); //Cargar las  variables de entorno para no codificar codigo sensible -> db

const app = require('./server');
require('./database');


app.listen(app.get('port'), ()=>{//Obtener el puerto de server.js para poder subirlo a un servidor
    console.log('server on port', app.get('port'));
    console.log('Environment:', process.env.NODE_ENV);
})