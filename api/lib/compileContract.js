// FIXME: Running `node scripts/compileContract.js Peerism`
// Bugs: Does not work when use comments in the contract
var solc = require('solc');
var fs = require('fs');
var path = require('path');
var Pudding = require('ether-pudding');

const compileContract = (contractName) => {
  var source = fs.readFileSync(
    path.join(__dirname, '../contracts')+'/'+contractName+'.sol',{encoding: 'utf8'}).toString()
    .replace(/\n/g,' ');
    // console.log(source);

  var compiled = solc.compile(source, 1);
  console.log(compiled);
  console.log(Object.keys(compiled.contracts))
  if(!compiled.contracts[':'+contractName]) {
    console.log('Contract must have same name as file!');
    process.exit(1);
  }
  var bytecode = compiled.contracts[':'+contractName].bytecode;
  var interface = compiled.contracts[':'+contractName].interface;

  var contract_data = {
    abi: JSON.parse(interface),
    binary: bytecode,
    address: '0x0000011111222223333344444555556666677777'
  };

  var expectedFilepath = path.join(__dirname, '../build/contracts')+'/'+contractName+'.sol.js';
  //console.log(contract_data);
  Pudding.save(contract_data, expectedFilepath)
    .then(function() {
      console.log('File '+'api/build/contracts/'+contractName+'.sol.js was created with the JS contract!' );
    })
    .catch(function(err) {
      console.log('Error saving contract', err);
    });

}

run = (contractName) => {
  compileContract(contractName);
}

// Process Routes for API
module.exports = {
  compileContract: compileContract
}

// Process CLI (i.e. `node lib/compileContract.js Peerism`)
// Reference: http://coding.pstodulka.com/2014/10/22/node-modules-as-cli/
if(require.main == module) {  
  if(process.argv.length < 3) {
    console.log('Error: Contract Name as argument is required');
    process.exit(1);
  }
  var contractName = process.argv[2];
  run(contractName);
}