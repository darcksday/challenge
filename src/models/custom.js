import { formatAmount, isEmptyAddress, shortAddress } from "../utilits";

import {Base} from "./base";
import ContractAddress from "../contractsData/CustomChallenge-address.json";
import Abi from "../contractsData/CustomChallenge.json";
export class Custom extends Base {

  static CONTRACT=ContractAddress?.address;
  static ABI=Abi.abi;
   static TABLE_HEADERS = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'bid', label: 'Bid Amount', alignRight: false },
    { id: 'cof', label: 'Coefficient', alignRight: false },
    { id: 'win_amount', label: 'Win Amount', alignRight: false },
    { id: 'maker', label: 'Initiator', alignRight: false },
    { id: 'taker', label: 'Opponent', alignRight: false },
    { id: 'deadline_date', label: 'Deadline', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'button', alignRight: false },
  ];



  constructor(item) {
    super(item);
    this.id=item.id.toString();
    this.name=item.name;
    this.description=item.description;
    this.cof=parseInt(item.cof);
    this.oracle_fee=parseInt(item.oracle_fee);
    this.maker=item.maker;
    this.taker=item.taker;
    this.oracle=item.oracle;
    this.winner=item.winner;
    this.s_maker=shortAddress(item.maker);
    this.s_taker=shortAddress(item.taker);
    this.s_oracle=shortAddress(item.oracle);
    this.created_date=parseInt(item.created_date);
    this.deadline_date=parseInt(item.deadline_date);
    this.finished=item.finished;
    this.paid_maker=parseInt(item.paid_maker);
    this.paid_taker=parseInt(item.paid_taker);
    this.paid_oracle=parseInt(item.paid_oracle);
    this.s_cof=formatAmount(item.cof, 18);
    this.s_paid_maker=formatAmount(item.paid_maker, 18);
    this.s_paid_taker=formatAmount(item.paid_taker, 18);
    this.s_paid_oracle=formatAmount(item.paid_oracle, 18);
    this.status= super.status();

  }


  get winingAmount() {
    let total = parseFloat(this.s_paid_maker) + parseFloat(this.s_paid_maker) * parseFloat(this.s_cof),
      oracleFee = parseInt(this.oracle_fee) / 100 * total,
      res = total - oracleFee;
    return res;
  }

  acceptPayment() {
    return parseFloat(this.s_paid_maker) * parseFloat(this.s_cof)
  }

  canJudge = ( address) => {
    return address === this.oracle && !isEmptyAddress(this.taker) && this.deadline_date < new Date() / 1000 && !this.finished
  }

  isOracle = (address) => {
    return address === this.oracle;


  }


  canAccept = ( address) => {
    return this.paid_taker === 0 && isEmptyAddress(this.taker) && address !== this.oracle && address !== this.maker
  }

  get contract(){
    return Custom.CONTRACT
  }

  get abi(){
    return Custom.ABI

  }



}