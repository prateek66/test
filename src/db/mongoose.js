const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.jxh6t.mongodb.net/Trooper?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("database connected success!!");
}).catch((err) => {
    console.log(`error while connecting ${err}`);
})