//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;



abstract contract ChallengeHelper {
  error DateExpired(string message);
  error InsufficientAmount(string message);
  error CantChange(string message);
  error NotFound(string message);
  error InvalidParams(string message);



  function isExpired(uint _date) internal view returns (bool){


    bool _res= block.timestamp >= _date;
    if(_res){

      revert DateExpired({message : "Deadline was expired"});
    }
    return _res;


  }


  function deleteByIndex(uint index,uint[] storage source) internal    {
    if (index >= source.length) return;

    for (uint i = index; i<source.length-1; i++){
      source[i] = source[i+1];
    }
    source.pop();


  }

  function findIndByValue(uint  _id,uint[] storage source) view internal  returns(uint,bool)   {

    for (uint _i = 0; _i<source.length; ++_i){
      if(source[_i]==_id){
        return (_i, true);

      }
    }

    return (0, false);


  }


}