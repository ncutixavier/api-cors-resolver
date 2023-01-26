import axios from 'axios';

class coinMarketController {
  static getAllCryptocurrencies(req, res) {
    axios({
      method: 'GET',
      url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY,
      },
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default coinMarketController;
