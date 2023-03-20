/* const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await ethers.getSigners()

  // Deploy Real Estate
  const RealEstate = await hre.ethers.getContractFactory('RealEstate')
  const realEstate = await RealEstate.deploy()
  await realEstate.deployed()

  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`)
  console.log(`Buyer address: ${buyer.address}`);
  console.log(`Seller address: ${seller.address}`);
  console.log(`Minting 3 properties...\n`)

  for (let i = 0; i < 3; i++) {
    const transaction = await realEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`)
    await transaction.wait()
  } 

  // Deploy Escrow
  const Escrow = await hre.ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(
    realEstate.address,
    seller.address,
    inspector.address,
    lender.address
  );
  await escrow.deployed()

  console.log(`Deployed Escrow Contract at: ${escrow.address}`)
  console.log(`Listing 3 properties...\n`)
 
  for (let i = 0; i < 3; i++) {
    // Approve properties using seller signer
    let transaction = await realEstate.connect(seller).approve(escrow.address, i + 1)
    await transaction.wait()
  }

  // Listing properties using seller signer
  let transaction = await escrow.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(15), tokens(5))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(10), tokens(5))
  await transaction.wait()

  console.log(`Finished.`)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
*/

const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyerPrivateKey, sellerPrivateKey, inspectorPrivateKey, lenderPrivateKey] = [    process.env.BUYER_PRIVATE_KEY,    process.env.SELLER_PRIVATE_KEY,    process.env.INSPECTOR_PRIVATE_KEY,    process.env.LENDER_PRIVATE_KEY  ];

  const buyer = new ethers.Wallet(buyerPrivateKey, ethers.provider);
  const seller = new ethers.Wallet(sellerPrivateKey, ethers.provider);
  const inspector = new ethers.Wallet(inspectorPrivateKey, ethers.provider);
  const lender = new ethers.Wallet(lenderPrivateKey, ethers.provider);

  // Deploy Real Estate
  const RealEstate = await hre.ethers.getContractFactory('RealEstate')
  const realEstate = await RealEstate.deploy()
  await realEstate.deployed()

  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`)
  console.log(`Minting 6 properties...\n`)

  for (let i = 0; i < 3; i++) {
    // Developer cid
    // QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB
    const transaction = await realEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmRDNj53S2x78vbKUCVTjegY48Rx4fUkTEZpyCcAjpZPG1/${i + 1}.json`)
    await transaction.wait()
  } 

  // Deploy Escrow
  const Escrow = await hre.ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(
    realEstate.address,
    seller.address,
    inspector.address,
    lender.address
  );
  await escrow.deployed()

  console.log(`Deployed Escrow Contract at: ${escrow.address}`)
  console.log(`Listing 6 properties...\n`)

  for (let i = 0; i < 3; i++) {
    // Approve properties using seller signer
    let transaction = await realEstate.connect(seller).approve(escrow.address, i + 1)
    await transaction.wait()
  }

  // Listing properties using seller signer
  let transaction = await escrow.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(15), tokens(5))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(10), tokens(5))
  await transaction.wait()

  console.log(`Finished.`)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

