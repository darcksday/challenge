import { formatAmount, isEmptyAddress, shortAddress } from "../utilits";
import { Base } from "./base";
import priceFeed from "../utilits/priceFeed.json";
import ContractAddress from "../contractsData/PriceChallenge-address.json";
import Abi from "../contractsData/PriceChallenge.json";
import { useState } from "react";
import { parseBytes32String } from "ethers/lib/utils";

export class Price extends Base {

  static CONTRACT = ContractAddress?.address;
  static ABI = Abi.abi;

  static TABLE_HEADERS = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'bid', label: 'Bid Amount', alignRight: false },
    { id: 'cof', label: 'Coefficient', alignRight: false },
    { id: 'win_amount', label: 'Win Amount', alignRight: false },
    { id: 'prediction_price', label: 'Initiator Prediction', alignRight: false },
    { id: 'maker', label: 'Initiator', alignRight: false },
    { id: 'taker', label: 'Opponent', alignRight: false },
    { id: 'deadline', label: 'Deadline', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'button', alignRight: false },

  ];


  constructor(item) {

    super(item);
    console.log(item)
    this.id = item.id.toString();
    this.name = item.name;
    this.description = item.description;
    this.cof = parseInt(item.cof);
    this.maker = item.maker;
    this.taker = item.taker;
    this.s_maker = shortAddress(item.maker);
    this.s_taker = shortAddress(item.taker);
    this.created_date = parseInt(item.created_date);
    this.deadline_date = parseInt(item.deadline_date);
    this.finished = item.finished;
    this.paid_maker = parseInt(item.paid_maker);
    this.paid_taker = parseInt(item.paid_taker);
    this.s_cof = formatAmount(item.cof, 18);
    this.s_paid_maker = formatAmount(item.paid_maker, 18);
    this.status = super.status();
    this.prediction_price = formatAmount(item.prediction_price, 8);
    this.prediction_type = item.prediction_type;
    this.token_symbol = parseBytes32String(item.token_symbol);
    this.accept_payment = (parseFloat(this.s_paid_maker) * parseFloat(this.s_cof)).toString();
  }


  get winingAmount() {
    return parseFloat(this.s_paid_maker) + parseFloat(this.s_paid_maker) * parseFloat(this.s_cof);
  }

  get winner() {
    return this.paid_maker > this.paid_taker ? this.maker : this.taker;

  }


  canAccept = (address) => {
    return this.paid_taker === 0 && isEmptyAddress(this.taker) && address !== this.maker
  }


  get tokenDetails() {
    return Price.priceFeedBySymbol(this.token_symbol);
  }


  static priceFeedBySymbol = (token_symbol) => {
    let res = {};

    if (priceFeed) {

      priceFeed['items'].forEach((item) => {
        if (item.symbol === token_symbol) {
          item['logo'] = Price.getLogo(item.logo_id);
          res = item;
        }
      })


    }
    return res;

  }

  static  getLogo = (logoId) => {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${logoId}.png`

  }

  get contract() {
    return Price.CONTRACT
  }

  get abi() {
    return Price.ABI

  }


}