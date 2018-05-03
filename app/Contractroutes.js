// app/routes.js
var mongojs = require('mongojs');
var dbUrl = require("../config/db");

//
module.exports = function (app) {
    app.get('/Contract/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        var contract = require('../config/contract');
        db.Orders.find({ 'importer': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'importer': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
                        if (DocM.customs != undefined) {
                            db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customs) }, function (err, DocC) {
                                DocM.CustomsName = DocC.companyname;
                                db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.insurance) }, function (err, DocI) {
                                    DocM.InsuranceName = DocI.companyname;
                                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                                        DocM.ShipperName = DocS.companyname;
                                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customsdestination) }, function (err, DocS) {
                                            DocM.CustomsNameDestination = DocS.companyname;
                                            data.push(DocM);
                                            i = i + 1;
                                            if (i == count) {
                                                res.json(data);
                                            }
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                res.json(data);
                            }
                        }
                    });
                }
            });
        });
    });

    app.get('/ContractDetail/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        var contract = require('../config/contract');
        db.Orders.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, DocM) {
            if (DocM) {
                db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                    DocM.ExporterName = DocE.companyname;
                    var idc = JSON.stringify(DocM._id).replace(/"/g, "");
                    contract.getData(idc, function (result) {
                        if (DocM.customs != undefined) {
                            db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customs) }, function (err, DocC) {
                                DocM.CustomsName = DocC.companyname;
                                db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.insurance) }, function (err, DocI) {
                                    DocM.InsuranceName = DocI.companyname;
                                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.shipper) }, function (err, DocS) {
                                        DocM.ShipperName = DocS.companyname;
                                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.customsdestination) }, function (err, DocS) {
                                            DocM.CustomsNameDestination = DocS.companyname;
                                            data.push(DocM);
                                            data.push(JSON.parse(result[0]));
                                            res.json(data);
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            data.push(DocM);
                            data.push(JSON.parse(result[0]));
                            res.json(data);
                        }
                    });
                });
            }
        });
    });
    app.get('/ContractGetExpoter/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ 'expoter': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'expoter': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.importer) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
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

    app.get('/ContractGetShipper/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'shipper': req.params.id }, { 'insurancestatus': 'Approved' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'shipper': req.params.id }, { 'insurancestatus': 'Approved' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
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

    app.get('/ContractGetCutoms/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'customs': req.params.id }, { 'insurancestatus': 'Approved' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'customs': req.params.id }, { 'insurancestatus': 'Approved' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
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

    app.get('/ContractGetCutomsOutgoing/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'customsdestination': req.params.id }, { 'insurancestatus': 'Approved' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'customsdestination': req.params.id }, { 'insurancestatus': 'Approved' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.importer) }, function (err, DocE) {
                        DocM.ImporterName = DocE.companyname;
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

    app.get('/ContractGetInsurance/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ 'insurance': req.params.id }).count(function (err, count) {
            db.Orders.find({ 'insurance': req.params.id }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
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

    app.get('/ContractGetInsuranceClaims/:id', ensureAuthorized, function (req, res) {
        var data = [];
        var i = 0;
        var db = mongojs(dbUrl.url, ['Orders', 'LOCUsers']);
        db.Orders.find({ $and: [{ 'insurance': req.params.id }, { 'status': 'Insurance Claimed' }] }).count(function (err, count) {
            db.Orders.find({ $and: [{ 'insurance': req.params.id }, { 'status': 'Insurance Claimed' }] }).forEach(function (err, DocM) {
                if (DocM) {
                    db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.expoter) }, function (err, DocE) {
                        DocM.ExporterName = DocE.companyname;
                        db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.importer) }, function (err, DocE) {
                            DocM.ImporterName = DocE.companyname;
                            data.push(DocM);
                            i = i + 1;
                            if (i == count) {
                                res.json(data);
                            }
                        });
                    });
                }
            });
        });
    });

    app.get('/ExpoterList/', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['LOCUsers']);
        db.LOCUsers.find({ UserType: 'Expoter' }, { companyname: 1 }, function (err, doc) {
            res.json(doc);
        });
    });

    app.get('/getimpoterddldata/', ensureAuthorized, function (req, res) {
        var db = mongojs(dbUrl.url, ['LOCUsers']);
        db.LOCUsers.find({ UserType: { $in: ['Customs', 'Shipper', 'Insurer'] } }, { companyname: 1, UserType: 1 }, function (err, doc) {
            res.json(doc);
        });
    });

    app.post('/ContractSave', ensureAuthorized, function (req, res) {
        var date = new Date();
        var s = req.body.dateofdilivery;
        var dateD = new Date(s.split('T')[0]);
        req.body.status = "With Expoter";
        req.body.dateofcontract = date.toDateString();
        req.body.importerstatus = 'Pending';
        req.body.expoterstatus = 'Pending';
        req.body.dateofdilivery = dateD.toDateString();
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.insert(req.body, function (err, docs) {
            var CreateJSONString = require("../config/CreateJSON");
            CreateJSONString.CreateJSONContractImpoter(docs, function (JSONData) {
                var hash = require("../config/hash");
                hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                    var contract = require('../config/contract');
                    var ContractID = JSONData.id;
                    contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                        if (result == "Saved") {
                            res.json("OK");
                        }
                    });
                });
            });
        });
    });

    app.put('/ContractUpdateE/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { expotercomment: req.body.expotercomment, expoterstatus: req.body.action } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var CreateJSONString = require("../config/CreateJSON");
                var contract = require('../config/contract');
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                contract.getData(ContractID, function (resultb) {
                    CreateJSONString.CreateJSONContractExpoter(doc, JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        });
    });

    app.put('/ContractUpdateS/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { shippercomment: req.body.shippercomment, shipperstatus: req.body.action } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                var contract = require('../config/contract');
                contract.getData(ContractID, function (resultb) {
                    var CreateJSONString = require("../config/CreateJSON");
                    CreateJSONString.CreateJSONContractShipper(doc, JSON.parse(resultb[0]),function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var contract = require('../config/contract');
                            var ContractID = JSONData.id;
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        }
        );
    });

    app.put('/ContractUpdateC/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { customscomment: req.body.customscomment, customsstatus: req.body.action } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                var contract = require('../config/contract');
                contract.getData(ContractID, function (resultb) {
                    var CreateJSONString = require("../config/CreateJSON");
                    CreateJSONString.CreateJSONContractCustoms(doc, JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var contract = require('../config/contract');
                            var ContractID = JSONData.id;
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });

                });
            }
        }
        );
    });

    app.put('/ContractUpdateImpoter/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var status;
        if (req.body.action == "Approved")
        { status = "Delivered" }
        else if (req.body.action == "Rejected")
        { status = "Rejected" }
        else if (req.body.action == "Claim Insurance")
        { status = "Insurance Claimed" }

        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { importercomment: req.body.importercomment, importerstatus: req.body.action, status: status } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var CreateJSONString = require("../config/CreateJSON");
                var contract = require('../config/contract');
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                contract.getData(ContractID, function (resultb) {
                    var CreateJSONString = require("../config/CreateJSON");
                    CreateJSONString.CreateJSONContractCustoms(doc,JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var contract = require('../config/contract');
                            var ContractID = JSONData.id;
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        }
        );
    });
    app.put('/ContractUpdateCOutgoing/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { customsdestinationcomment: req.body.customsdestinationcomment, customsdestinationstatus: req.body.action } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                var contract = require('../config/contract');
                contract.getData(ContractID, function (resultb) {
                    var CreateJSONString = require("../config/CreateJSON");
                    CreateJSONString.CreateJSONContractCustomsOutgoing(doc, JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var contract = require('../config/contract');
                            var ContractID = JSONData.id;
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        }
        );
    });
    app.put('/ContractUpdateI/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { insurancecomment: req.body.insurancecomment, insurancestatus: req.body.action } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                var contract = require('../config/contract');
                contract.getData(ContractID, function (resultb) {
                    var CreateJSONString = require("../config/CreateJSON");
                    CreateJSONString.CreateJSONContractInsurance(doc, JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var ContractID = JSONData.id;
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        }
        );
    });

    app.put('/ContractUpdateIClaim/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        if (req.body.action == "Approved")
        { status = "Claim Approved" }
        else if (req.body.action == "Rejected")
        { status = "Claim Rejected" }
        else if (req.body.action == "Claim Insurance")
        { status = "Insurance Claimed" }
        var db = mongojs(dbUrl.url, ['Orders']);
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: { insuranceclaimcomment: req.body.insuranceclaimcomment, insuranceclaimstatus: req.body.action, status: status } },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                var contract = require('../config/contract');
                contract.getData(ContractID, function (resultb) {
                    var CreateJSONString = require("../config/CreateJSON");
                    CreateJSONString.CreateJSONContractInsuranceClaims(doc,JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var contract = require('../config/contract');
                            var ContractID = JSONData.id;
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        }
        );
    });
    app.put('/ShipmentSend/:id', ensureAuthorized, function (req, res) {
        var id = req.params.id;
        var s = req.body.dateofshipment;
        var dateD = new Date(s.split('T')[0]);
        req.body.dateofshipment = dateD.toDateString();
        var db = mongojs(dbUrl.url, ['Orders','LOCUsers']);
        //db.LOCUsers.findOne({ _id: mongojs.ObjectId(DocM.importer) }, function (err, DocM) {});
        db.Orders.findAndModify({
            query: { _id: mongojs.ObjectId(id) }, 
            update: {
                $set: {
                    shipper: req.body.shipper, customs: req.body.customs, insurance: req.body.insurance,
                    costofgoods: req.body.costofgoods, placeofshippment: req.body.placeofshippment, dateofshipment: req.body.dateofshipment,
                    status: "Shipment Send", insurancestatus: "Pending", shipperstatus: "Pending", customsstatus: "Pending", customsdestinationstatus: "Pending", customsdestination: req.body.customsdestination
                }
            },
            new: true
        }, function (err, doc) {
            if (err)
            { console.log(" Woops! The error took place here... "); }
            else {
                var CreateJSONString = require("../config/CreateJSON");
                var contract = require('../config/contract');
                var ContractID = JSON.stringify(doc._id).replace(/"/g, "");
                contract.getData(ContractID, function (resultb) {
                    CreateJSONString.CreateJSONContractExpoterS(doc, JSON.parse(resultb[0]), function (JSONData) {
                        var hash = require("../config/hash");
                        hash.GetHASHforString(JSON.stringify(JSONData), function (hashcode) {
                            var contract = require('../config/contract');
                            contract.saveData(ContractID, JSON.stringify(JSONData), hashcode, function (result) {
                                if (result == "Saved") {
                                    res.json("OK");
                                }
                            });
                        });
                    });
                });
            }
        }
        );
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

