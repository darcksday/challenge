# BetMe

BetMe is a decentralised, peer-to-peer prediction market, built via Account Abstraction technologies for improve UI experience.

### Ethereum Smart Contracts

Three smart contracts were written in Solidity for BetMe:

- `CustomChallenge.sol` - This contract responsible for Custom bets. Deployed on Mumbai Testnet `0xf0699FdAd4A58472C13553d1965D682f88A3e551`
- `PriceChallenge.sol` - This contract responsible for Price bets. Deployed on Mumbai Testnet `0x33107Ff5a765B6472A0943eA5975FdB3E5b2CCC6`

### Gelato Web3Functions Repository

[Link](https://github.com/darcksday/betme-gelato-functions)

### Quick Links for Code

Here are some quick links to code in this repo, including some examples of where hackathon sponsor tech was used:

- [Contracts](smart_contract/)
- [Frontend](src/)
- [Gelato Gasless Wallet](src/context/Web3Context.js#L52)
- [Web3Auth](src/context/Web3Context.js#L70)
- [Gelato Gasless Transaction](src/context/GelatoTxContext.js)

## Getting Started

These instructions will get you a copy of the project up and running on your Mumbai testnet for development and testing purposes.

### Prerequisites

```
nodeJS >= 16.0
npm
```

### Installing

Install dependencies and create environment file:

```
npm install
cp .env-example .env
```

Fill environment variables.

### Deploy & run

```
npx hardhat run smart_contract/scripts/deploy.js --network mumbai
npm run start
```

### Build for Production

```
npm run build
```

## Next Steps

- Run on mainnet and add ability deposits via credit card
- Launching pool bets, with dynamic coefficient and unlimited participants
- Dynamic automated events (sources of information for Oracle setup manually)
- Add ability to bet for more assets,real-world events,sport, politics etc.

## Links

- Try it now: https://challenge-seven-psi.vercel.app/(minting on Mumbai testnet)
- Demo Video: https://youtu.be/u4QmkGzS8wQ

## Contact

- Twitter: @MacksPopov
- Discord: Macks darcksday#0596
- Github: @darcksday

![grid](https://challenge-seven-psi.vercel.app/logo2.dbbde0f4.png)