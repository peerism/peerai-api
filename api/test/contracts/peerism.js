var Peerism = artifacts.require("./Peerism.sol");

contract('Peerism', function(accounts) {
  it("should trigger Skill Event returning event transaction hash", function() {
    return Peerism.deployed().then(function(instance) {
      return instance.skill('3d printing', 
        {fromBlock: 0, toBlock: 'latest'}, 
        function(error, result) {
          if (!error) {
            return result;
          } else {
            return error;
          }
        }
    }).then(function(result) {
      let expectedTxHash = '0x5cafdf008286ad83d0b220bcabe7ade5650babfbb7a3844ba1debd60d2a13ae1';
      assert.equal(result, expectedTxHash, "Skill Event did not trigger expected transaction hash");
    });
  });
});

