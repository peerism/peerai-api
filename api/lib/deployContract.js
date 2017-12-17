var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var artifactor = require('truffle-artifactor');
var txutils = lightwallet.txutils;

const deployContract = (contractName) => {
  // FIXME - Convert to Singleton
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  console.log("Connected to Web3 Status: " + web3.isConnected());

  /**
   *  IMPORTANT: Obtain an Ethereum address and private key that was created and shown
   *  in the TestRPC Terminal window
   */
  var accountAddress = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
  var accountPrivateKey = '0000000000000000000000000000000000000000000000000000000000000001';

  /**
   *  Compile the Smart Contracts with `truffle compile --compile-all`. 
   *  Solidity Contracts .sol are compiled into .json files in the 
   *  build/contracts directory.
   */

  /**
   *  Obtain the Bytecode (used for execution in the EVM) and the 
   *  ABI (provides mapping for JS to interact with Solidity)
   */

  // // When compiled using `truffle compile...`
  // var Peerism = require("../build/contracts/Peerism.json");
  // var contractBytecode = Peerism.bytecode;
  // var contractABI = Peerism.abi;

  // When compiled using compileContract.js
  var Peerism = require(`../build/contracts/${contractName}.sol.js`);
  Peerism.setProvider(web3);
  var contractBytecode = Peerism.all_networks.default.unlinked_binary;
  var contractABI = Peerism.all_networks.default.abi;
  var contractAddress = Peerism.deployed().contract.address;

  // Do not supply more gas than the block gas limit else error: Exceeds block gas limit
  console.log('Current Block Gas Limit: ', web3.eth.getBlock('latest'));

  /**
   *  Function to sign transaction with the private key of our Ethereum address
   *  and send the transaction to the Ethereum TestRPC network
   */
  function sendRaw(rawTx) {
    var privateKey = new Buffer(accountPrivateKey, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendrawtransaction
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, hash) {
      if(err) {
        console.log('sendRawTransaction error: ', err);
      } else {
        console.log('sendRawTransaction transaction address: ', hash);
        // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethgettransactionreceipt
        web3.eth.getTransactionReceipt(hash, function(err, receipt) {
          if(err) {
            console.log('getTransactionReceipt error: ', err);
          } else {
            console.log('getTransactionReceipt transaction receipt: ', receipt);
            console.log('getTransactionReceipt transaction address: ', receipt.contractAddress);
          }
        }) 
      }
    });
  }

  /**
   *  Deploy the Smart Contract by constructing the following transaction
   *    - nonce - sequential integer to track number of outgoing transactions
   *    - gasLimit - max gas to pay for the transaction
   *    - gasPrice - price willing to pay for gas used in the transaction
   *      (i.e. transaction fee in Ether == gasPrice * gas used)
   *    - data - instructions for the transaction, which includes:
   *       - bytecode - to instruct the creation of the Ballot smart contract
   *       - argument - the argument to the Ballot function in the smart contract 
   *         is zero padded (i.e. where a value of 5 is the argument _numProposals) 
   */
  var rawTx = {
    nonce: web3.toHex(web3.eth.getTransactionCount(accountAddress)),
    gasLimit: web3.toHex(200000),
    gasPrice: web3.toHex(70000000000), // 70 GWei
    data: '0x' + contractBytecode + '0000000000000000000000000000000000000000000000000000000000000005'
  };

  /**
   *  Estimate the cost of sending the transaction to a random address
   */
  var gasEstimate = web3.eth.estimateGas({
    to: "0xc4abd0339eb8d57087278718986382264244252f", 
    data: rawTx.data
  });
  console.log(gasEstimate);

  // FIXME - When try to deploy contract by calling `sendRaw` instead of migrating 
  // the contract using Truffle with `truffle migrate --reset --network development`
  // it always results in these errors, where default sender balance: 6666756738730000000000,
  // even though the gasEstimate returns only 316120
  //   - Error: VM Exception while processing transaction: out of gas
  //   - Error: base fee exceeds gas limit

  /**
   *  Send the transaction to the Ethereum TestRPC
   */
  // sendRaw(rawTx);

  /**
   *  Deploy the contract with Truffle Migrate `truffle migrate --reset --network development`
   *  then obtain Contract Address with:
   */
  // contractAddress = '0xf422e821237328257e9ae78d30a6081753cd67be';
  const peerismContractABI = web3.eth.contract(contractABI)
  const peerismContractInstance = peerismContractABI.at(contractAddress);

  // Assign default account
  web3.eth.defaultAccount = web3.eth.accounts[0];
  console.log(web3.eth.coinbase);
  console.log(web3.eth.defaultAccount);

  // Filter pending
  const filter = web3.eth.filter('pending');
  filter.watch(function (err, result) {
    console.log('Event log watched: ', result);
  });
  filter.stopWatching();

  // All Events
  var allEvents = peerismContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
  allEvents.watch(function(error, event){
    if (!error)
      console.log(event);
  });
  allEvents.stopWatching();

  // Filter
  // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethfilter
  web3.eth.filter({
    address: contractAddress,
    fromBlock: 0,
    toBlock: 'latest',
    topics: [web3.sha3('SkillEvent(address,bytes32,uint)')]
    // topics: [web3.sha3('newtest(string,uint256,string,string,uint256)')]
  }).get(function (err, result) {
    console.log('Event log filtered: ', result);
  });

  // Call event in Peerism Smart Contract
  // http://solidity.readthedocs.io/en/develop/contracts.html#events
  var event = peerismContractInstance.skill('3d printing', 
    {fromBlock: 0, toBlock: 'latest'}, 
    function(error, result) {
      if (!error) {
        console.log('Event log from contract: ', result);
      } else {
        console.log('Error logging: ', error);
      }
    }
  );

  return contractAddress;
}

run = (contractName) => {
  deployContract(contractName);
}

// Process Routes for API
module.exports = {
  deployContract: deployContract
}

// Process CLI (i.e. `node lib/deployContract.js Peerism`)
if(require.main == module) {  
  if(process.argv.length < 3) {
    console.log('Error: Contract Name as argument is required');
    process.exit(1);
  }
  var contractName = process.argv[2];
  run(contractName);
}
