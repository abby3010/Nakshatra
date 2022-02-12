// 

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/pziNBiuh8-Og5HyAuMHoB6pdC4Oe9NFh',
      accounts: ['279d57571c3602b5aed57f022ac6d70964e5945f7a18019be03aeaf5581c5e5a']
    }
  }
}