const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test-db'
,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> console.log('Mongo is UP'))
    .catch((err) => console.log('Mongo is down. Raison :',err));
