# Web3 Funding Platform - AI Coding Instructions

This is a decentralized crowdfunding platform with smart contracts and a Nuxt.js frontend. The architecture follows a factory pattern for project creation with democratic task approval.

## Project Architecture

### Smart Contract Layer (`ethereum/`)
- **Factory Pattern**: `ProjectFactory.sol` deploys individual `Project.sol` instances
- **Project Lifecycle**: Create project → Join with minimal contribution → Create tasks → Democratic approval (>50% participants) → Complete tasks
- **Key Security**: Creator + participant modifiers, approval mapping to prevent double-voting
- **Dual Build Systems**: Both Truffle and Hardhat configs present (Truffle actively configured with Solidity 0.8.30)

### Frontend Layer (`web3-funding-front/`)
- **Nuxt 4 with TypeScript**: Modern Vue 3 SSR framework
- **Contract Integration**: ABI and bytecode mirrored from `ethereum/build/contracts/` to `web3-funding-front/contracts/`
- **Modules**: ESLint, Fonts, Icons, Images, Testing utilities

### Contract Synchronization Pattern
Contract artifacts flow: `ethereum/build/contracts/*.json` → `ethereum/contract-data/` → `web3-funding-front/contracts/`

## Development Workflows

### Smart Contract Development
```bash
# Navigate to ethereum directory
cd ethereum

# Compile contracts (Truffle)
truffle compile

# Deploy to local network
truffle migrate

# Run tests
truffle test
```

### Frontend Development
```bash
# Navigate to frontend
cd web3-funding-front

# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build
```

### Contract ABI Updates
When modifying smart contracts:
1. Recompile in `ethereum/` directory
2. Copy updated ABIs from `build/contracts/` to `contract-data/`
3. Sync to frontend `contracts/` directory
4. Update frontend imports if interface changes

## Key Patterns & Conventions

### Smart Contract Patterns
- **Access Control**: `restrictedToParticipantAndCreator` and `restrictedToCreator` modifiers
- **State Management**: Mapping-based participant tracking, task approval counting
- **ID Generation**: Cryptographic hash using `block.prevrandao`, timestamp, nonce, and sender
- **Approval Logic**: Majority voting (>50% participants) triggers task approval

### Task Management Flow
```solidity
// Task creation (by participants/creator)
createTask(description, reward) → generates unique ID

// Democratic approval
approveTask(taskNumber) → increments approval count → auto-approve at >50%

// State tracking: approved flag, completion status, approver mapping
```

### Frontend Integration
- Contract ABIs in `contracts/contracts.json` 
- Bytecode available for deployment scenarios
- Project and ProjectFactory interfaces exported

## Critical Files
- `ethereum/contracts/project.sol` - Core project logic with task management
- `ethereum/contracts/projectFactory.sol` - Project deployment factory
- `ethereum/truffle-config.js` - Network and compiler configuration
- `web3-funding-front/nuxt.config.ts` - Frontend build configuration
- `ethereum/contract-data/contracts.json` - ABI definitions for frontend

## Common Issues & Solutions
- **Empty config files**: `hardhat.config.js` and `extract-contracts.js` need implementation
- **Contract sync**: Manual copy process between build artifacts and frontend
- **Version compatibility**: Solidity 0.8.30 specified in truffle config
- **Migration setup**: Only `.gitkeep` in migrations - deployment scripts needed

## Web3 Integration Notes
- Factory pattern allows unlimited project creation
- Each project is independent contract with own participants and treasury
- Participant contributions locked until project completion
- Democratic governance prevents creator abuse through majority voting
