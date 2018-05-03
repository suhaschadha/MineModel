// app/routes.js
var mongojs = require('mongojs');
var dbUrl = require("../config/db");


module.exports = function (app) {
    app.get('/payment/:id', ensureAuthorized, function (req, res) {
        var userid  = req.params.id;
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Transactions', 'LOCUsers']);
        db.Transactions.find({ 'companyid': userid }).count(function (err, count) {
            db.Transactions.find({ 'companyid': userid }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.tranactioncompanyid) }, function (err, DocD) {
                        DocM.companyname = DocD.companyname;
                        data.push(DocM);
                        i = i + 1;
                        if (i == count) {
                            res.json(data);
                        }
                    });
                }
            });
        });
    });
    

    
};

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}


