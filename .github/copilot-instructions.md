# Web3 DevOps Platform - AI Coding Instructions

This is a Web3 DevOps platform that combines blockchain infrastructure management with decentralized project orchestration. The platform automates smart contract deployment, monitoring, and lifecycle management while providing a modern frontend for devops operations and infrastructure management.

## Project Architecture

### Smart Contract Infrastructure (`ethereum/`)
- **Factory Pattern**: `ProjectFactory.sol` deploys and manages individual blockchain project instances
- **DevOps Lifecycle**: Create infrastructure project → Configure participants → Define deployment tasks → Automated approval workflows → Execute deployments
- **Security & Access Control**: Role-based access with creator and participant modifiers, multi-signature approval patterns
- **Multi-Environment Support**: Truffle and Hardhat configurations for different deployment targets (local, testnet, mainnet)

### Frontend DevOps Dashboard (`d3v0ps/`)
- **Nuxt 4 with TypeScript**: Modern Vue 3 SSR framework for infrastructure management UI
- **Contract Integration**: Real-time ABI and bytecode synchronization from `ethereum/build/contracts/` to `d3v0ps/contracts/`
- **DevOps Modules**: ESLint for code quality, monitoring utilities, deployment dashboards

### Infrastructure Automation Pipeline
Contract artifacts flow: `ethereum/build/contracts/*.json` → `ethereum/contract-data/` → `d3v0ps/contracts/` → Automated deployment triggers

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
cd d3v0ps

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
- `d3v0ps/nuxt.config.ts` - Frontend build configuration
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
