var fs = require('fs');
var erisC = require('eris-contracts');

var erisdbURL = "http://192.168.99.100:1337/rpc";
var contractFolder = '../contracts/';
var contractData = require(contractFolder + 'jobs_output.json');
var ContractAddress = contractData["deployContractHashdata"];
var Abi = JSON.parse(fs.readFileSync("./contracts/abi/" + ContractAddress));
var accountData = require(contractFolder + './accounts.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData.loc_full_000);
var LOCContract = contractsManager.newContractFactory(Abi).at(ContractAddress);

module.exports = {
   getData : function(Data_ID,callback) {
    LOCContract.getHashData(Data_ID, function (error, result) {
      if (error) { throw error }
      callback(result);
    });
  },
  saveData : function(Data_ID, RealData, HashData,  callback){
    LOCContract.addHashdata(Data_ID, RealData, HashData, function(error,result){
      if(error){throw error;}
      callback("Saved");
    });
  }
};