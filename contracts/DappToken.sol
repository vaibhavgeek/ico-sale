// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DappToken {
    string public name = "VAIBHAV";
    string public symbol = "VAI";
  // constructor 
  // set the total no of tokens
  // read the total number of tokens
  uint256 public totalSupply;
  mapping (address => uint256) public balanceOf;
  constructor(uint256 _initialSupply) public {
    // allocate the initial supply
    balanceOf[msg.sender] = _initialSupply;
    // totalsupply is initial supply 
    totalSupply = _initialSupply;
  }
}
