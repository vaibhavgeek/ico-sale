// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DappToken {

  // create some public strings  
    string public name = "VAIBHAV";
    string public symbol = "VAI";
    string public standard = "V1.0";


  uint256 public totalSupply;
  mapping (address => uint256) public balanceOf;
  mapping (address => mapping(address => uint256)) public allowance;
  // event to transfer money 
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
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

  // approve function 
 function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
