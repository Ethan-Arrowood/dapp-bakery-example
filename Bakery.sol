pragma solidity ^0.5.0;

contract Bakery {

  address[] public contracts;

  function getContractCount() public view returns(uint contractCount)
  {
    return contracts.length;
  }

  function newCookie(string memory flavor) public returns(address newContract)
  {
    Cookie c = new Cookie(flavor);
    contracts.push(address(c));
    return address(c);
  }
}


contract Cookie {

  string public flavor;

  constructor (string memory _flavor) public {
      flavor = _flavor;
  }

  function getFlavor() public view returns (string memory)
  {
    return flavor;
  }
}