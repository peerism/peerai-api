pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/Peerism.sol";

contract TestPeerism {

  function testSkillEventUsingDeployedContract() public {
    Peerism peerism = Peerism(DeployedAddresses.Peerism());

    uint expected = 1;

    Assert.equal(peerism.skill(tx.origin), expected, "Skill event should have value of 1");
  }

}
