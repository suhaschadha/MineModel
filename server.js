// Required Modules
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongojs = require('mongojs');

var app = express();

var port = process.env.PORT || 4040;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app);
require('./app/Contractroutes')(app);
require('./app/paymentroute')(app);





app.use(morgan("dev"));
//error hadler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
process.on('uncaughtException', function (err) {
    console.log(err);
});

// Start Server
var server=app.listen(port, function () {
    console.log("Express server listening on port " + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
     console.log('a user connected');
    });
    
    app.post('/gas',function(req,res){
    var data=JSON.stringify(req.body);
    var val=JSON.parse(data);
    var num=val.Status;
    io.emit('gass',num);
    console.log("GAS");
    res.send("All Ok!!");
    });

    app.post('/weight',function(req,res){
    var data=JSON.stringify(req.body);
    var val=JSON.parse(data);
    var num=val.Status;
    //console.log("Weight");
    io.emit('weightt',num);
    res.send("All Ok!!");
    });
 
    app.post('/access',function(req,res){
    var data=JSON.stringify(req.body);
    var val=JSON.parse(data);
    var num=val.Status;
    io.emit('accesss',num);
    res.send("All Ok!!");
    });

    app.post('/temp',function(req,res){
    var data=JSON.stringify(req.body);
    var val=JSON.parse(data);
    var num=val.Status;
    io.emit('tempp',num);
    res.send("All Ok!!");
    });

    app.post('/locomotive',function(req,res){
    var data=JSON.stringify(req.body);
    var val=JSON.parse(data);
    var num=val.Status;
    io.emit('locomotivee',num);
    res.send("All Ok!!");
    });


/*
{
    "_id" : ObjectId("598166afd824e3556a422cee"),
    "expoter" : "597ee12ac98432c0c3bc1b8c",
    "importer" : "59801e38c98432c0c3bcf79a",
    "status" : "With Expoter",
    "dateofcontract" : "1 Aug 2017",
    "dateofshipment" : "18 Aug 2017",
    "placeofshippment" : "Kochi India",
    "dateofdilivery" : "18 Sep 2017",
    "placeofdilivery" : "USA",
    "goods" : "Methylol Pyroligneous",
    "goodsquantity" : "400 Containers (20 litres X 400 Containers)",
    "costofgoods" : "",
    "customs" : "59801e38c98432c0c3bcf798",
    "customsdestination" : "598ae9e28605d636fd6aba84",
    "insurance" : "59801e38c98432c0c3bcf79c",
    "shipper" : "59801e38c98432c0c3bcf79e",
    "expoterstatus" : "Approved",
    "customsstatus" : "Approved",
    "insurancestatus" : "Approved",
    "shipperstatus" : "Approved",
    "importerstatus" : "Approved",
    "expotercomment" : "Approved",
    "customscomment" : "Approved",
    "insurancecomment" : "Approved",
    "shippercomment" : "Approved",
    "importercommant" : "Approved",
    "customsdestinationstatus":"Approved"
}

var contract = require('./config/contract');
var id ='22222222';
contract.saveData("22222222", "JSON.stringify(JSONData)", "hashcodgggggggggggggggge", function (result) {
    contract.getData(id, function (resulta) {
        var ww = resulta;
        console.log(ww);
    });
});
*/