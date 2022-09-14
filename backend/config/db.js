const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const conn = async () =>{
    try{
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.fez6biz.mongodb.net/?retryWrites=true&w=majority`)

        console.log("conectou ao banco")
        return dbConn;
    }

    catch(error){
        console.log(error)
    }
}

conn();

module.exports = conn;