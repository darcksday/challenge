import { formatAmount, shortAddress } from './index';
import { useAccount } from 'wagmi';

export const transformChallenges = (item) => {


  return {
    id: item.id.toString(),
    name: item.name,
    description: item.description,
    cof: parseFloat(item.cof),
    oracle_fee: parseInt(item.oracle_fee),
    maker: item.maker,
    taker: item.taker,
    oracle: item.oracle,
    s_maker: shortAddress(item.maker),
    s_taker: shortAddress(item.taker),
    s_oracle: shortAddress(item.oracle),
    c_type: item.c_type,
    created_date: parseInt(item.created_date),
    deadline_date: parseInt(item.deadline_date),


    paid_maker: parseInt(item.paid_maker),
    paid_taker: parseInt(item.paid_taker),
    paid_oracle: parseInt(item.paid_oracle),

    s_paid_maker: formatAmount(item.paid_maker, 18),
    s_paid_taker: formatAmount(item.paid_taker, 18),
    s_paid_oracle: formatAmount(item.paid_oracle, 18),
    status: getStatus(item),


  }


  function getStatus(item) {
    let status = 'waiting'
    if (parseInt(item.paid_taker) && item.deadline_date > new Date() / 1000) {
      status = 'finished';
    } else if (parseInt(item.paid_taker)) {
      status = 'taken';
    }
    return status;


  }


};



