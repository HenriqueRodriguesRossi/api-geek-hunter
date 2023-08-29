const mongoose = require("mongoose");
const dbUser = process.env.dbuser;
const dbPass = process.env.dbpass;

function connectToDatabase() {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.fsiei4f.mongodb.net/?retryWrites=true&w=majority`);

    const connection = mongoose.connection;

    connection.on("open", () => {
        console.log("Connected to the database successfully!");
    });

    connection.on("error", (error) => {
        console.log("Error connecting to the database!");
    });
}

connectToDatabase();
module.exports = mongoose;
