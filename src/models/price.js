import { formatAmount, isEmptyAddress, shortAddress } from "../utilits";
import { Base } from "./base";

export class Price extends Base{
  constructor(item) {
    super(item);



    this.id=item.id.toString();
    this.name=item.name;
    this.description=item.description;
    this.cof=parseInt(item.cof);
    this.maker=item.maker;
    this.taker=item.taker;
    this.winner=item.winner;
    this.s_maker=shortAddress(item.maker);
    this.s_taker=shortAddress(item.taker);
    this.created_date=parseInt(item.created_date);
    this.deadline_date=parseInt(item.deadline_date);
    this.finished=item.finished;
    this.paid_maker=parseInt(item.paid_maker);
    this.paid_taker=parseInt(item.paid_taker);
    this.s_cof=formatAmount(item.cof, 18);
    this.s_paid_maker=formatAmount(item.paid_maker, 18);
    this.status= super.status();
    this.prediction_price=formatAmount(item.prediction_price,8);
    this.prediction_type=item.prediction_type;

  }



  get winingAmount() {
    return parseFloat(this.s_paid_maker) + parseFloat(this.s_paid_maker) * parseFloat(this.s_cof);
  }

  acceptPayment() {
    return parseFloat(this.s_paid_maker) * parseFloat(this.s_cof)
  }

  canAccept = ( address) => {
    return this.paid_taker === 0 && isEmptyAddress(this.taker)  && address !== this.maker
  }




}