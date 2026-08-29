import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 Deploying PromisePay contract to Monad Testnet...');

  const [deployer] = await ethers.getSigners();
  console.log('Deployer account:', deployer ? await deployer.getAddress() : 'Local Deployer');

  const PromisePay = await ethers.getContractFactory('PromisePay');
  const promisePay = await PromisePay.deploy();

  await promisePay.waitForDeployment();

  const contractAddress = await promisePay.getAddress();

  console.log('✅ PromisePay contract deployed successfully!');
  console.log('📍 Contract Address:', contractAddress);
  console.log('🔗 Monad Explorer:', `https://testnet.monadexplorer.com/address/${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
