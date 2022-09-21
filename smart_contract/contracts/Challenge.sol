//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Strings.sol";

import "./Utils.sol";

contract Challenge is Utils {
  uint public id;

  error DateExpired(string message);
  error ZeroAmount(string message);



  enum Type {
    Pari,
    Challenge
  }

  struct ChallengeStruct {

    uint id;
    string name;
    string description;
    string cof;
    uint oracle_fee;
    address maker;
    address taker;
    address oracle;
    address winner;
    uint paid_maker;
    uint paid_taker;
    uint paid_oracle;

    Type c_type;
    uint created_date;
    uint deadline_date;
  }

  mapping(uint => ChallengeStruct) challenges;
  mapping(address=>uint[]) makerChallenges;
  mapping(address=>uint[]) takerChallenges;



  function getId() internal returns (uint) {
    return id++;
  }


  function create(string memory _name, string memory _description,string memory _cof,uint _oracle_fee,uint _deadline_date, address _oracle ) external payable {

    if (msg.value < 0) {

      revert ZeroAmount({message : "You should attach some Deposit"});

    }

    if (isExpired(_deadline_date)) {

      revert DateExpired({message : "Deadline was expired"});

    }

    uint _id=getId();
    ChallengeStruct memory _newCl = ChallengeStruct(
     _id,
      _name,
      _description,
      _cof,
      _oracle_fee,

      msg.sender,
      address(0),
      _oracle,
      address(0),
      msg.value,
      0,
      0,
      Type.Pari,
      block.timestamp,
      _deadline_date
    );

    challenges[_id]=_newCl;

    makerChallenges[msg.sender].push(_id);

  }


  function isExpired(uint _date) internal view returns (bool){
    return block.timestamp >= _date;
  }

  function allChallenges() external view returns (ChallengeStruct[] memory){

      ChallengeStruct[] memory _result= new ChallengeStruct[](id);
      for (uint _i; _i<id;++_i){
        _result[_i]=challenges[_i];

      }

      return _result;



  }

  function getById(uint _id) public view returns (ChallengeStruct memory) {

    return challenges[_id];
  } 




}



