import { formatAmount, isEmptyAddress, shortAddress } from './index';
import { useAccount } from 'wagmi';

export const transformChallenges = (item) => {
  if (!item.paid_maker) {
    return false;
  }
  let s_paid_maker = formatAmount(item.paid_maker, 18)
  let s_cof = formatAmount(item.cof, 18)

  function getStatus() {
    let status = 'waiting';
    if (item.finished) {
      status = 'finished';

    } else if (parseInt(item.paid_taker) && item.deadline_date < new Date() / 1000) {
      status = 'in review';
    } else if (parseInt(item.paid_taker)) {
      status = 'taken';
    }
    return status;


  }


  function winingAmount(item) {
    let total = parseFloat(s_paid_maker) + parseFloat(s_paid_maker) * parseFloat(s_cof),
      oracleFee = parseInt(item.oracle_fee) / 100 * total,
      res = total - oracleFee;
    return res;

  }

  function acceptPayment() {
    return parseFloat(s_paid_maker) * parseFloat(s_cof)

  }

  return {
    id: item.id.toString(),
    name: item.name,
    description: item.description,
    cof: parseInt(item.cof),
    oracle_fee: parseInt(item.oracle_fee),
    maker: item.maker,
    taker: item.taker,
    oracle: item.oracle,
    winner: item.winner,
    s_maker: shortAddress(item.maker),
    s_taker: shortAddress(item.taker),
    s_oracle: shortAddress(item.oracle),
    c_type: item.c_type,
    created_date: parseInt(item.created_date),
    deadline_date: parseInt(item.deadline_date),
    finished: item.finished,


    paid_maker: parseInt(item.paid_maker),
    paid_taker: parseInt(item.paid_taker),
    paid_oracle: parseInt(item.paid_oracle),

    s_cof: s_cof,
    s_paid_maker: s_paid_maker,
    s_paid_taker: formatAmount(item.paid_taker, 18),
    s_paid_oracle: formatAmount(item.paid_oracle, 18),
    status: getStatus(),

    accept_payment: acceptPayment().toString(),

    wining_amount: winingAmount(item)


  }


};

export const filterEmpty = (item) => {
  return parseInt(item.paid_maker)

}
export const isOracle = (item, address) => {
  return address === item.oracle;


}

export const isMaker = (item, address) => {
  return address === item.maker;
}

export const isTaker = (item, address) => {
  return address === item.taker;
}

export const canAccept = (item, address) => {
  return item.paid_taker === 0 && isEmptyAddress(item.taker) && address !== item.oracle && address !== item.maker
}

export const canDelete = (item, address) => {
  return address === item.maker && item.paid_taker === 0 && isEmptyAddress(item.taker)
}

export const canJudge = (item, address) => {
  return address === item.oracle && !isEmptyAddress(item.taker) && item.deadline_date < new Date() / 1000 && !item.finished
}

