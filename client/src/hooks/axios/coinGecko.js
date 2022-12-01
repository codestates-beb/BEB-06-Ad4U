import axios from 'axios';

export const exchange = async (curCost, vsCurrencies) => {
    const cost = curCost;
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${vsCurrencies}`;
    const options = {
      url: coinGeckoUrl,
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    }
    var toEth = 0;
    await axios.request(options)
      .then(res => {
        if (vsCurrencies == "krw") {
          toEth = (1 / res.data.ethereum.krw) * cost;
        } else if (vsCurrencies == "usd") {
          toEth = (1 / res.data.ethereum.usd) * cost;
        } else if (vsCurrencies == "eur") {
          toEth = (1 / res.data.ethereum.eur) * cost;
        }
      })
      .catch(err => console.log(err))

    return toEth;
}