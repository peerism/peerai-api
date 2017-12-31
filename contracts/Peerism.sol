pragma solidity ^0.4.17;

contract Peerism {

  uint public numSkills;

  bool public fallbackTriggered;

  event SkillEvent(
    address indexed _from,
    bytes32 indexed _id,
    uint _value
  );

  struct Skill {
    uint weight;
  }

  address public owner;

  function Peerism(uint8 _numSkills) public {
    owner = msg.sender;
    numSkills = _numSkills;
    fallbackTriggered = false;
  }

  function skill(bytes32 _id) public payable {
    SkillEvent(msg.sender, _id, 1);
  }

  function() payable {
    fallbackTriggered = true;
  }
}


