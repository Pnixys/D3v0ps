# d3v0ps

A decentralized crowdfunding platform with smart contracts and a Nuxt.js frontend.

## Overview

This project implements a Web3 funding platform using a factory pattern for project creation with democratic task approval. The platform consists of:

- **Smart Contract Layer**: Ethereum smart contracts built with Solidity
- **Frontend Layer**: Nuxt 4 with TypeScript for the user interface

## Architecture

### Smart Contract Layer (`ethereum/`)
- **Factory Pattern**: `ProjectFactory.sol` deploys individual `Project.sol` instances
- **Project Lifecycle**: Create project → Join with minimal contribution → Create tasks → Democratic approval (>50% participants) → Complete tasks
- **Key Security**: Creator + participant modifiers, approval mapping to prevent double-voting

### Frontend Layer (`web3-funding-front/`)
- **Nuxt 4 with TypeScript**: Modern Vue 3 SSR framework
- **Contract Integration**: ABI and bytecode mirrored from smart contracts

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm
- Truffle or Hardhat
- MetaMask or compatible Web3 wallet

### Smart Contract Development
```bash
cd ethereum
npm install
truffle compile
truffle migrate
truffle test
```

### Frontend Development
```bash
cd web3-funding-front
pnpm install
pnpm dev
```

## Project Structure

```
├── ethereum/                 # Smart contracts
│   ├── contracts/           # Solidity contracts
│   ├── migrations/          # Deployment scripts
│   ├── test/               # Contract tests
│   └── build/              # Compiled contracts
├── web3-funding-front/      # Frontend application
│   ├── app/                # Nuxt app files
│   ├── contracts/          # Contract ABIs
│   └── public/             # Static assets
└── .github/                # GitHub workflows and configs
```

## Features

- **Decentralized Project Creation**: Anyone can create funding projects
- **Democratic Governance**: Task approval requires majority participant vote
- **Secure Fund Management**: Smart contract-controlled treasury
- **Transparent Operations**: All transactions on blockchain

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions and support, please open an issue in this repository.
