import { Injectable } from '@nestjs/common';
import { isAddress } from 'web3-utils';
import { response } from 'express';
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/cbbc4bb211394120a9edd170a4e10eec',
  ),
);

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getEth(req): any {
    const { adresses } = req.body;
    const results = [];
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2C&vs_currencies=usd',
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const { usd } = response.ethereum;
        adresses.map(async (adress) => {
          const result = await isAddress(adress);
          const balance = await web3.eth.getBalance(adress);
          const rbalance = balance / Math.pow(10, 18);
          console.log('balance', rbalance)
          const usdPrice = rbalance * usd
          console.log('usdPrice', usdPrice)
          results.push(result);
        });
      });
    return results;
  }
}
