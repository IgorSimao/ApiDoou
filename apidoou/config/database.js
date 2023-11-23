let mongoose = require("mongoose")

module.exports = () => {
    let url = "mongodb://localhost:27017/appDoou";
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    mongoose.connect(url, options);

    mongoose.connection.once('open', () => {
        console.log("[Mongoose] Conectado em " + url)
    });

    mongoose.connection.on('error', (error) => {
        console.log("[Mongoose] Erro na conexão: " + error);
    })

}