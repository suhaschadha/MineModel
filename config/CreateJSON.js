module.exports = {
CreateJSONContractImpoter : function(JSONData,callback) {
    var JSONDataNew = {
      "id": JSON.stringify(JSONData._id).replace(/"/g, ""),
      "status": JSONData.status,
      "expoter": JSONData.expoter,
      "importer": JSONData.importer,
      "dateofdilivery": JSONData.dateofdilivery,
      "placeofdilivery": JSONData.placeofdilivery,
      "goods": JSONData.goods,
      "goodsquantity": JSONData.goodsquantity,
      "dateofcontract":JSONData.dateofcontract,
      "importerstatus":JSONData.importerstatus,
      "expoterstatus": JSONData.expoterstatus
    }
    callback(JSONDataNew);
  },
  CreateJSONContractExpoter : function(JSONData,JSONBData,callback) {
    var JSONDataNew = {
      "id": JSONBData.id,
      "status": JSONBData.status,
      "expoter": JSONBData.expoter,
      "importer": JSONBData.importer,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,

      "expotercomment": JSONData.expoterstatus,
      "expoterstatus": JSONData.expoterstatus
    }
    callback(JSONDataNew);
  },
   CreateJSONContractShipper : function(JSONData,JSONBData,callback) {
    var JSONDataNew = {
      "id": JSONBData.id,
      "status": JSONBData.status,
      "expoter": JSONBData.expoter,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,
      "expoterstatus": JSONBData.expoterstatus,
      "expotercomment":JSONBData.expotercomment,
      "shipper":JSONBData.shipper,
      "customs":JSONBData.customs,
      "insurance":JSONBData.insurance,
      "costofgoods": JSONBData.costofgoods,
      "placeofshippment":JSONBData.placeofshippment,
      "dateofshipment":JSONBData.dateofshipment,
      "insurancestatus": JSONBData.insurancestatus,
      "customsstatus" : JSONBData.customsstatus,
      "customsdestinationstatus": JSONBData.customsdestinationstatus,

      "shipperstatus" : JSONData.shipperstatus,
      "shippercomment": JSONData.shippercomment,
    }
    callback(JSONDataNew);
  },
  CreateJSONContractCustoms : function(JSONData, JSONBData, callback) {
    var JSONDataNew = {
       "id": JSONBData.id,
      "status": JSONBData.status,
      "expoter": JSONBData.expoter,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,
      "expoterstatus": JSONBData.expoterstatus,
      "expotercomment":JSONBData.expotercomment,
      "shipper":JSONBData.shipper,
      "customs":JSONBData.customs,
      "insurance":JSONBData.insurance,
      "costofgoods": JSONBData.costofgoods,
      "placeofshippment":JSONBData.placeofshippment,
      "dateofshipment":JSONBData.dateofshipment,
      "insurancestatus": JSONBData.insurancestatus,
      "shipperstatus" : JSONBData.shipperstatus,
      "shippercomment": JSONBData.shippercomment,
      "customsdestinationstatus": JSONBData.customsdestinationstatus,

      "customsstatus" : JSONData.customsstatus,
      "customscomment": JSONData.customscomment,
    }
    callback(JSONDataNew);
  },
  CreateJSONContractCustomsOutgoing : function(JSONData,JSONBData,callback) {
    var JSONDataNew = {
       "id": JSONBData.id,
      "status": JSONBData.status,
      "expoter": JSONBData.expoter,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,
      "expoterstatus": JSONBData.expoterstatus,
      "expotercomment":JSONBData.expotercomment,
      "shipper":JSONBData.shipper,
      "customs":JSONBData.customs,
      "insurance":JSONBData.insurance,
      "costofgoods": JSONBData.costofgoods,
      "placeofshippment":JSONBData.placeofshippment,
      "dateofshipment":JSONBData.dateofshipment,
      "insurancestatus": JSONBData.insurancestatus,
      "shipperstatus" : JSONBData.shipperstatus,
      "customsstatus" : JSONBData.customsstatus,
      "shippercomment": JSONBData.shippercomment,
      "customscomment": JSONBData.customscomment,

      "customsdestinationstatus": JSONData.customsdestinationstatus,
      "customsdestinationcomment": JSONData.customsdestinationcomment

    }
    callback(JSONDataNew);
  },
  CreateJSONContractInsurance : function(JSONData,JSONBData, callback) {
    var JSONDataNew = {
       "id": JSONBData.id,
      "status": JSONBData.status,
      "expoter": JSONBData.expoter,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,
      "expoterstatus": JSONBData.expoterstatus,
      "expotercomment":JSONBData.expotercomment,
      "shipper":JSONBData.shipper,
      "customs":JSONBData.customs,
      "insurance":JSONBData.insurance,
      "costofgoods": JSONBData.costofgoods,
      "placeofshippment":JSONBData.placeofshippment,
      "dateofshipment":JSONBData.dateofshipment,
      "shipperstatus" : JSONBData.shipperstatus,
      "customsstatus" : JSONBData.customsstatus,
      "shippercomment": JSONBData.shippercomment,
      "customscomment": JSONBData.customscomment,

      "insurancestatus": JSONData.insurancestatus,
      "insurancecomment": JSONData.insurancecomment
    }
    callback(JSONDataNew);
  },
  CreateJSONContractInsuranceClaims : function(JSONData,JSONBData,callback) {
    var JSONDataNew = {
      "id": JSONBData.id,
      "expoter": JSONBData.expoter,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,
      "expoterstatus": JSONBData.expoterstatus,
      "expotercomment":JSONBData.expotercomment,
      "shipper":JSONBData.shipper,
      "customs":JSONBData.customs,
      "insurance":JSONBData.insurance,
      "costofgoods": JSONBData.costofgoods,
      "placeofshippment":JSONBData.placeofshippment,
      "dateofshipment":JSONBData.dateofshipment,
      "insurancestatus": JSONBData.insurancestatus,
      "shipperstatus" : JSONBData.shipperstatus,
      "customsstatus" : JSONBData.customsstatus,
      "shippercomment": JSONBData.shippercomment,
      "customscomment": JSONBData.customscomment,
      "insurancecomment": JSONBData.insurancecomment,

      "status": JSONData.status,
      "insuranceclaimcomment":JSONData.insuranceclaimcomment,
      "insuranceclaimstatus":JSONData.insuranceclaimstatus
    }
    callback(JSONDataNew);
  },
  CreateJSONContractExpoterS : function(JSONData,JSONBData,callback) {
    var JSONDataNew = {
      "id": JSONBData.id,
      "expoter": JSONBData.expoter,
      "importer": JSONBData.importer,
      "dateofdilivery": JSONBData.dateofdilivery,
      "placeofdilivery": JSONBData.placeofdilivery,
      "goods": JSONBData.goods,
      "goodsquantity": JSONBData.goodsquantity,
      "dateofcontract":JSONBData.dateofcontract,
      "importerstatus":JSONBData.importerstatus,
      "expoterstatus": JSONBData.expoterstatus,
      "expotercomment":JSONBData.expotercomment,

      "status": JSONData.status,
      "shipper":JSONData.shipper,
      "customs":JSONData.customs,
      "customsdestination":JSONData.customsdestination,
      "insurance":JSONData.insurance,
      "costofgoods": JSONData.costofgoods,
      "placeofshippment":JSONData.placeofshippment,
      "dateofshipment":JSONData.dateofshipment,
      "insurancestatus": JSONData.insurancestatus,
      "shipperstatus" : JSONData.shipperstatus,
      "customsstatus" : JSONData.customsstatus,
      "customsdestinationstatus": JSONData.customsdestinationstatus
    }
    callback(JSONDataNew);
  }

};