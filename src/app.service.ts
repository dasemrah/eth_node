import { Injectable } from '@nestjs/common';
import { isAddress } from 'web3-utils';
import { response } from 'express';
import { rejects } from 'assert';
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/cbbc4bb211394120a9edd170a4e10eec',
  ),
);
const ethURl =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2C&vs_currencies=usd';
const balanceUrl = (address) =>
  `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-rCck5-i2jmqjb-9U3Js`;
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getEth(req): Promise<any> {
    const addresses = req.body;
    const wrong_addresses = [];
    const sorted_addresses = [];
    return fetch(ethURl)
      .then((response) => response.json())
      .then((response) => {
        const { usd } = response.ethereum;
        return new Promise<any>(async (resolve, reject) => {
          await Promise.all(
            addresses.map(async (item): Promise<any> => {
              const valid = isAddress(item);
              if (valid) {
                const balanceResp = await web3.eth.getBalance(item);
                const balance = balanceResp / Math.pow(10, 18);
                sorted_addresses.push({
                  address: item,
                  eth_balance: balance,
                  usd_balance: balance * usd,
                });
              } else wrong_addresses.push(item);
            }),
          );
          sorted_addresses.sort(function (a, b) {
            if (a.usd_balance > b.usd_balance) return -1;
            if (a.usd_balance < b.usd_balance) return 1;
            return 0;
          });
          resolve({ wrong_addresses, sorted_addresses });
        });
      });
  }
}
