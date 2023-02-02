import { isEmptyAddress } from "../utilits";

export class Base {


  constructor(item) {

  }



  isMaker = ( address) => {
    return address === this.maker;
  }

   isTaker = ( address) => {
    return address === this.taker;
  }



   canDelete = ( address) => {
    return address === this.maker && this.paid_taker === 0 && isEmptyAddress(this.taker)
  }




   status() {
    let status = 'waiting';
    if (this.finished) {
      status = 'finished';
    } else if (parseInt(this.paid_taker) && this.deadline_date < new Date() / 1000) {
      status = 'in review';

    } else if (parseInt(this.paid_taker)) {
      status = 'taken';

    }



    return status;
  }





}