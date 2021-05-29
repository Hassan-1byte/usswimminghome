const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/usswimminghome", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Database is connected successfully`);
  })
  .catch(() => {
    console.log(`Database is not connected`);
  });
