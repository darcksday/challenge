//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./ChallengeHelper.sol";



import "./Utils.sol";

contract PriceChallenge is Utils,ChallengeHelper {
  uint public id;


  enum PredictionType{ MORE, LESS }





  struct ChallengeStruct {

    uint id;
    string name;
    uint cof;
    address maker;
    address taker;
    uint paid_maker;
    uint paid_taker;
    address token_address;
    uint created_date;
    uint deadline_date;
    bool finished;
    uint prediction_price;
    PredictionType prediction_type;


  }

  mapping(uint => ChallengeStruct) challenges;
  mapping(address=>uint[]) userChallenges;







  function getId() internal returns (uint) {
    return id++;
  }


  function create(string memory _name,uint  _cof,uint _deadline_date, address _token_address,uint _price_prediction,PredictionType _prediction_type ) external payable {

    if (msg.value < 0) {

      revert InsufficientAmount({message : "You should attach some Deposit"});

    }

    // isExpired(_deadline_date);





    uint _id=getId();
    ChallengeStruct memory _newCl = ChallengeStruct(
      _id,
      _name,
      _cof,
      msg.sender,
      address(0),
      msg.value,
      0,
      _token_address,
      block.timestamp,
      _deadline_date,
      false,
      _price_prediction,
      _prediction_type
    );

    challenges[_id]=_newCl;

    userChallenges[msg.sender].push(_id);





  }


  function allChallenges(bool active) external view returns (ChallengeStruct[] memory){

    ChallengeStruct[] memory _result= new ChallengeStruct[](id);
    for (uint _i; _i<id;++_i){

      if(active){
        if(!challenges[_i].finished){
          _result[_i]=challenges[_i];
        }
      }else{
        _result[_i]=challenges[_i];

      }


    }

    return _result;

  }


  function getUserChallenges(address u_address) external view returns (ChallengeStruct[] memory){



    uint item_length=userChallenges[u_address].length;
    ChallengeStruct[] memory _result = new ChallengeStruct[](item_length);
    for (uint _i=0; _i < item_length; ++_i) {

      uint item_id=userChallenges[u_address][_i];

      _result[_i] = challenges[item_id];

    }

    return _result;

  }


  function getById(uint _id) public view returns (ChallengeStruct memory) {

    return challenges[_id];
  }

  function remove(uint _id) public  returns (bool){

    ChallengeStruct memory _item= challenges[_id];
    if(_item.maker!=msg.sender || _item.taker!=NULL_ADDRESS){

      revert CantChange({message : "You can't remove Challenge"});

    }

    delete challenges[_id];
    (uint _index,bool _isItem)=findIndByValue(_id,userChallenges[msg.sender]);


    if(_isItem){
      payable(msg.sender).transfer(_item.paid_maker);

      deleteByIndex(_index,userChallenges[msg.sender]);

    }




    return true;
  }


  function isItem(uint _id) view internal returns(ChallengeStruct memory){

    ChallengeStruct memory _item= challenges[_id];
    if(_item.paid_maker==0){
      revert NotFound({message:"Item not found"});
    }

    return _item;

  }


  function canSetWinner(uint _i) view internal returns (bool) {

    return (!challenges[_i].finished &&
    challenges[_i].paid_maker!=0 &&
    challenges[_i].paid_taker!=0 &&
    challenges[_i].deadline_date<=block.timestamp
    );

  }



  function setWinner(uint _i) public{

    ChallengeStruct memory _item=challenges[_i];
    int _price=cronPriceFeed(_item.token_address);

    uint _win_amount= SafeMath.add(_item.paid_maker,_item.paid_taker);

    bool maker_win=false;

    if(_item.prediction_type==PredictionType.MORE && uint(_price)>_item.prediction_price){
      maker_win=true;

    }
    if (_item.prediction_type==PredictionType.LESS && uint(_price)<_item.prediction_price){
      maker_win=true;

    }


    if(maker_win){
      payable(challenges[_i].maker).transfer(_win_amount);
      challenges[_i].paid_maker=_win_amount;
    }else{
      payable(challenges[_i].taker).transfer(_win_amount);
      challenges[_i].paid_taker=_win_amount;
    }

    challenges[_i].finished=true;


  }

  function accept(uint _id) external payable {

    ChallengeStruct memory _item= isItem(_id);
    if(_item.taker!=NULL_ADDRESS){

      revert CantChange({message:"Acept error"});

    }

    uint _taker_amount=SafeMath.div(SafeMath.mul(_item.paid_maker, _item.cof),10**18);

    if (msg.value < _taker_amount){

      revert InsufficientAmount({message:"Insufficient funds"});



    }


    challenges[_id].taker=msg.sender;
    challenges[_id].paid_taker=msg.value;

    userChallenges[msg.sender].push(_id);



  }








  function cronPriceFeed(address tokenAddress) view public returns(int){

    AggregatorV3Interface priceFeed=AggregatorV3Interface(tokenAddress);
    (
    ,
    /*uint80 roundID*/ int price /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,
    ,
    ,

    ) = priceFeed.latestRoundData();
    return price;



  }


  function cronCall() external {

    for (uint _i; _i<id;++_i){
      if(!challenges[_i].finished &&  canSetWinner(_i)){

        setWinner(_i);

      }
    }
  }

}



