# BetMe

## Getting Started

These instructions will get you a copy of the project up and running on your Mumbai testnet for development and testing purposes.

### Prerequisites

```
nodeJS >= 16.0
npm
```

### Local usage:

1. Run hardhat local server
2. Deploy tableland contract (use evm-tableland):

``` 
npx hardhat run scripts/deploy.ts --network localhost
```

4. Deploy smart-contracts
5. Run frontend

### Installing

Install dependencies and create environment file:

```
npm install
cp .env-example .env
```

Fill environment variables in files:

- .env
- .env.localhost

### Build & Deploy

```
npm run start
```
