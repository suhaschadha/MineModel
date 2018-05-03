var mongoose = require('mongoose');

var FileSchema = mongoose.Schema({
    originalfilename: String,
    path: String,
    path: String,
    destination: String,
    size: String,
    filetype:String,
    location: String,
    createdby:String,
    createddate: Date,
    hash:String,
    file: Object
});

module.exports = mongoose.model('File', FileSchema);