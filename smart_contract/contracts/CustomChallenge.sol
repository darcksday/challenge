//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ChallengeHelper.sol";


import "./Utils.sol";

contract CustomChallenge is Utils, ChallengeHelper {
	uint public id;


	struct ChallengeStruct {

		uint id;
		string name;
		string description;
		uint cof;
		uint oracle_fee;
		address maker;
		address taker;
		address oracle;
		address winner;
		uint paid_maker;
		uint paid_taker;
		uint paid_oracle;
		uint created_date;
		uint deadline_date;
		bool finished;

	}

	mapping(uint => ChallengeStruct) challenges;
	mapping(address => uint[]) userChallenges;





	function getId() internal returns (uint) {
		return id++;
	}


	function create(string memory _name, string memory _description, uint _cof, uint _oracle_fee, uint _deadline_date, address _oracle) external payable {

		if (msg.value < 0) {

			revert InsufficientAmount({message : "You should attach some Deposit"});

		}

		isExpired(_deadline_date);


		uint _id = getId();
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
			block.timestamp,
			_deadline_date,
			false
		);

		challenges[_id] = _newCl;

		userChallenges[msg.sender].push(_id);


	}


	function allChallenges() external view returns (ChallengeStruct[] memory){

		ChallengeStruct[] memory _result = new ChallengeStruct[](id);
		for (uint _i; _i < id; ++_i) {
			_result[_i] = challenges[_i];

		}

		return _result;


	}


	function getUserChallenges(address u_address) external view returns (ChallengeStruct[] memory){


		uint item_length = userChallenges[u_address].length;
		ChallengeStruct[] memory _result = new ChallengeStruct[](item_length);
		for (uint _i = 0; _i < item_length; ++_i) {

			uint item_id = userChallenges[u_address][_i];

			_result[_i] = challenges[item_id];

		}

		return _result;

	}

	function getById(uint _id) public view returns (ChallengeStruct memory) {

		return challenges[_id];
	}

	function remove(uint _id) public returns (bool){

		ChallengeStruct memory _item = challenges[_id];
		if (_item.maker != msg.sender || _item.taker != NULL_ADDRESS) {

			revert CantChange({message : "You can't remove Challenge"});

		}

		delete challenges[_id];
		(uint _index,bool _isItem) = findIndByValue(_id, userChallenges[msg.sender]);


		if (_isItem) {
			payable(msg.sender).transfer(_item.paid_maker);

			deleteByIndex(_index, userChallenges[msg.sender]);

		}


		return true;
	}


	function calcFinalAmount(ChallengeStruct memory _item) pure internal returns (uint, uint){
		uint _total = SafeMath.add(_item.paid_maker, _item.paid_taker);
		uint _oracle = SafeMath.div(SafeMath.mul(_total, _item.oracle_fee), 100);
		uint _win = _total - _oracle;

		return (_oracle, _win);

	}

	function calcDrawAmount(ChallengeStruct memory _item) pure internal returns (uint, uint, uint){
		uint _total = SafeMath.add(_item.paid_maker, _item.paid_taker);
		uint _oracle = SafeMath.div(SafeMath.mul(_total, _item.oracle_fee), 100);
		uint _maker = _item.paid_maker - SafeMath.div(SafeMath.mul(_item.paid_maker, _item.oracle_fee), 100);
		uint _taker = _item.paid_taker - SafeMath.div(SafeMath.mul(_item.paid_taker, _item.oracle_fee), 100);


		return (_oracle, _maker, _taker);

	}


	function isItem(uint _id) view internal returns (ChallengeStruct memory){

		ChallengeStruct memory _item = challenges[_id];
		if (_item.paid_maker == 0) {
			revert NotFound({message : "Item not found"});
		}

		return _item;

	}


	function canSetWinner(ChallengeStruct memory _item) view internal returns (bool) {

		if (_item.oracle != msg.sender ||
		_item.winner != NULL_ADDRESS ||
		_item.paid_maker == 0 ||
		_item.paid_taker == 0 ||
			_item.deadline_date > block.timestamp
		)
		{
			revert CantChange({message : "You can't set winner to this Challenge"});
		}
		return true;

	}


	function setWinner(uint _id, address _winner) public {
		ChallengeStruct memory _item = isItem(_id);

		canSetWinner(_item);


		if (_winner == _item.maker || _winner == _item.taker) {


			(uint _oracle_fee,uint _win_amount) = calcFinalAmount(_item);

			if (_oracle_fee != 0) {
				payable(_item.oracle).transfer(_oracle_fee);
				challenges[_id].paid_oracle = _oracle_fee;

			}

			if (_win_amount != 0) {
				payable(_winner).transfer(_win_amount);

				if (_winner == _item.maker) {
					challenges[_id].paid_maker = _win_amount;

				} else {
					challenges[_id].paid_taker = _win_amount;

				}

			}


			challenges[_id].winner = _winner;
			challenges[_id].finished = true;


		} else {
			revert InvalidParams({message : "Invalid winner address"});

		}


	}

	function setDraw(uint _id) public {

		ChallengeStruct memory _item = isItem(_id);
		canSetWinner(_item);
		(uint _oracle_fee,uint _maker,uint _taker) = calcDrawAmount(_item);

		if (_oracle_fee != 0) {
			payable(_item.oracle).transfer(_oracle_fee);
			challenges[_id].paid_oracle = _oracle_fee;

		}

		if (_maker != 0) {
			payable(_item.maker).transfer(_maker);
			challenges[_id].paid_maker = _maker;

		}

		if (_taker != 0) {
			payable(_item.taker).transfer(_taker);
			challenges[_id].paid_taker = _taker;

		}
		challenges[_id].finished = true;


	}


	function accept(uint _id) external payable {

		ChallengeStruct memory _item = isItem(_id);
		if (_item.oracle == msg.sender || _item.taker != NULL_ADDRESS) {

			revert CantChange({message : "Acept error"});

		}

		uint _taker_amount = SafeMath.div(SafeMath.mul(_item.paid_maker, _item.cof), 10 ** 18);

		if (msg.value < _taker_amount) {

			revert InsufficientAmount({message : "Insufficient funds"});


		}


		challenges[_id].taker = msg.sender;
		challenges[_id].paid_taker = msg.value;

		userChallenges[msg.sender].push(_id);


	}


}



