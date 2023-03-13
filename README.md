# BetMe

BetMe is is a decentralised, peer-to-peer prediction market, giving you the freedom to bet: how much you want, all at you want and against whom you want


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