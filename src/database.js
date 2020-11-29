const mongoose = require('mongoose');


const {TLAHCO_APP_MONGODB_HOST, TLAHCO_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = 'mongodb+srv://Brayan:mares123@cluster0.vrjgf.mongodb.net/<dbname>?retryWrites=true&w=majority';
//`mongodb://${TLAHCO_APP_MONGODB_HOST}/${TLAHCO_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('Database is connected'))
    .catch (err => console.log(err));