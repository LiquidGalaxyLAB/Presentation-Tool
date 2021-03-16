const mongoose = require('mongoose')

//connects to the presentationDB database located in the localhost
module.exports = mongoose.connect(`mongodb://mongo:27017/presentationsDB`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db')
});


// Defining the model schema
var PresentationSchema = new mongoose.Schema({
  id:{
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {type: String},
  category: {type: String},
  audiopath: {type: String},
  maxscreens:{type: Number},
  openlogos:{type: Boolean},
  slides: [{
    _id:false,
    id: {type: String, require:true},
    duration: {type: Number, require: true},
    audiopath: {type:String},
    flyto: {type: String},
    screens: [{
      _id:false,
      screennumber: {type: Number, require:true},
      media: [{
        _id:false,
        id: {type: String, require:true},
        filename: {type: String, require:true},
        type: {type: String, require:true},
        storagepath: {type: String, require: true},
        position: {type: String, require:true},
        sharing: {type: String},
        partner: {type: Number}
      }]
    }]
  }]
})

// Defining the collection and exportin the model
mongoose.model('presentations',PresentationSchema)
var Presentation = mongoose.model('presentations')
module.exports = Presentation



