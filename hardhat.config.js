require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const { API_URL, BUYER_PRIVATE_KEY, SELLER_PRIVATE_KEY, INSPECTOR_PRIVATE_KEY, LENDER_PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    mumbai: {
      url: API_URL,
      accounts: [`0x${BUYER_PRIVATE_KEY}`, `0x${SELLER_PRIVATE_KEY}`,`0x${INSPECTOR_PRIVATE_KEY}`, `0x${LENDER_PRIVATE_KEY}` ]
    }
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
