const mongoose = require("mongoose")
const connectionString = process.env.MONGODB_URI
mongoose.set("strictQuery", true)

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("BDD connectée, bravo Onesizer !"))
  .catch((errorMessage) => console.error(errorMessage))