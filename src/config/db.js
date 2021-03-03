const mongoose = require("mongoose");

module.exports = async function connectDB(){
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        console.log(`MongoDB successfully connected at ${connection.connection.host}`);
    } catch (ex) {
        console.log(`Error: ${ex}`);
        process.exit(1);
    }
}