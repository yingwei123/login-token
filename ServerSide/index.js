const mongoose = require('mongoose');
const config = require('./config');
const app = require('./server');

const startAll = async () =>  {
  try {
    await mongoose.connect(
      config.MONGODB_URI,
      {
        useNewUrlParser:true,
      useUnifiedTopology: true
    }
    );

    const db = mongoose.connection;

    app.listen(config.PORT, () =>{
      console.log(`Test Server Works`);
    });
  } catch (e) {
    console.error('Test Server Failed', e);
  }
}


startAll();
