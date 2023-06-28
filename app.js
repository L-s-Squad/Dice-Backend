const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// models:
require('./models/player')

// routes:
const playerRouter = require('./routes/player')

const PORT = 5000 



// Database connection: // abhi123// WMPC7NkXiMYfWKe2 

mongoose.connect("mongodb+srv://abhi123:WMPC7NkXiMYfWKe2@auth.vshotk7.mongodb.net/")

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo yeahhh")
})
mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err)
})


// Middlewares:
app.use(cors())
app.use(express.json())
app.use("/api", playerRouter)





app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})