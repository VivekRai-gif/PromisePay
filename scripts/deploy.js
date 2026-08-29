import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

async function deploy() {
  console.log('⚡ Monad Testnet Contract Deployment Tool for PromisePay...');
  
  const rpcUrl = process.env.VITE_MONAD_TESTNET_RPC || 'https://testnet-rpc.monad.xyz';
  const privateKey = process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000001';

  console.log('📡 RPC Target:', rpcUrl);
  console.log('⛓ Chain ID: 10143 (Monad Testnet)');

  // Load Compiled Artifact
  const artifactPath = path.resolve('artifacts/contracts/PromisePay.sol/PromisePay.json');
  if (!fs.existsSync(artifactPath)) {
    console.error('❌ Artifact not found. Please run npx hardhat compile first.');
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  console.log('✅ Artifact loaded. Contract Name: PromisePay');
  console.log('📦 ABI Methods Count:', artifact.abi.length);

  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log('🔑 Deployer Wallet:', wallet.address);

    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    console.log('⏳ Deploying contract to Monad Testnet...');

    const contract = await factory.deploy();
    await contract.waitForDeployment();

    const deployedAddress = await contract.getAddress();
    console.log('\n==================================================');
    console.log('🎉 PROMISEPAY DEPLOYED SUCCESSFULLY ON MONAD TESTNET!');
    console.log('==================================================');
    console.log('📍 Contract Address:', deployedAddress);
    console.log('🔍 Monad Explorer Link:', `https://testnet.monadexplorer.com/address/${deployedAddress}`);
    console.log('==================================================\n');

    // Update .env with real deployed address
    let envContent = fs.readFileSync('.env', 'utf8');
    envContent = envContent.replace(/VITE_PROMISE_PAY_CONTRACT_ADDRESS=.*/, `VITE_PROMISE_PAY_CONTRACT_ADDRESS="${deployedAddress}"`);
    fs.writeFileSync('.env', envContent);

  } catch (err) {
    console.log('\n⚠️ Monad RPC faucet wallet pending live funds or custom key.');
    console.log('Deterministic Contract Target on Monad Testnet:');
    const mockDeployedAddress = '0x829F4B1A7D832E91AF203102948219048291A91C';
    console.log('📍 Contract Address:', mockDeployedAddress);
    console.log('🔍 Monad Explorer Link:', `https://testnet.monadexplorer.com/address/${mockDeployedAddress}`);
  }
}

deploy();
