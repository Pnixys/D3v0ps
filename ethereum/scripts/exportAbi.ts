import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Compile the contracts using Truffle
execSync('truffle compile', { stdio: 'inherit' });

const contracts = ["Project.json", "ProjectFactory.json", "ReentrancyGuard.json"];

contracts.forEach(contract => {
    const src = path.resolve(__dirname, `../build/contracts/${contract}`);
    const dest = path.resolve(__dirname, `../d3v0ps/contracts/${contract}`);
    const json = JSON.parse(fs.readFileSync(src, 'utf-8'));
    const toExport = JSON.stringify({ abi: json.abi });
    fs.writeFileSync(dest, toExport);
    console.log(`Export de l'ABI de ${contract} vers le front`);
});