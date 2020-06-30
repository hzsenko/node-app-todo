const express = require('express');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const path = require('path');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const todosRoutes = require('./routes/todos');

const app = express();
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(todosRoutes);

async function start() {
    try {
        await mongoose
        .connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0-kj0qu.mongodb.net/${process.env.DB_COLLECTION}`, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log('Server has been started...');
        });
    }
    catch(e) {
        console.log(e);
    }
}

start();

