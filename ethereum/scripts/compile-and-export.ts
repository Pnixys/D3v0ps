import { execSync } from 'child_process';
import { exportAbi } from './exportAbi';

// Compile the smart contracts using Truffle
execSync('truffle compile', { stdio: 'inherit' });

// Export the ABI to the frontend
exportAbi();