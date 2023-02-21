import { isEmptyAddress } from "../utilits";

export class Base {


  constructor(item) {

  }


  isMaker = (address) => {
    return address === this.maker;
  }

  isTaker = (address) => {
    return address === this.taker;
  }


  canDelete = (address) => {
    return address === this.maker && this.paid_taker === 0 && isEmptyAddress(this.taker)
  }


  status() {
    let status = 'open';
    if (this.finished) {
      status = 'closed';
    } else if (!parseInt(this.paid_taker) && this.deadline_date < new Date() / 1000) {
      status = 'expired';

    } else if (parseInt(this.paid_taker) && this.deadline_date < new Date() / 1000) {
      status = 'in review';

    } else if (parseInt(this.paid_taker)) {
      status = 'in play';

    }

    return status;
  }


}