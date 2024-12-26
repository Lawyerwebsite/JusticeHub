const mongoose =  require("mongoose");

const connection = () => {
    mongoose.connect(
        "mongodb+srv://alkalam456:PEw8msbrhfXBFJTg@jhclusters.rxa5a.mongodb.net/"
        // "mongodb+srv://alkalam456:Abdul2102@cluster0.agn77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(`Connection Error ${err}`);
      });

}

module.exports = connection;
