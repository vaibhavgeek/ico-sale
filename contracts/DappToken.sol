// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DappToken {

  // create some public strings  
    string public name = "VAIBHAV";
    string public symbol = "VAI";
    string public standard = "V1.0";


  uint256 public totalSupply;
  mapping (address => uint256) public balanceOf;
  
  // event to transfer money 
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  // constructor 
  // set the total no of tokens
  // read the total number of tokens
  
  constructor(uint256 _initialSupply) public {
    // allocate the initial supply
    balanceOf[msg.sender] = _initialSupply;
    // totalsupply is initial supply 
    totalSupply = _initialSupply;
  }

  // Transfer
  // Exception if account does not have enough
  // Return a Boolean 
  // Transfer Event  
  function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
  } 
}
