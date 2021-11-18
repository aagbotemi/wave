const hre = require("hardhat");

async function main() {
  const WavePortal = await hre.ethers.getContractFactory("WavePortal");
  const wave = await WavePortal.deploy();
  await wave.deployed();
  console.log("WavePortal deployed to:", wave.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
