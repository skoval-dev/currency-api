//USD => UAH
// 1 USD is worth XX 0.84118. You can spend it in the following countries:

const axios = require("axios");

const get_exchange_rate = async (from, to) => {
    const exchange = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    return exchange.data.rates[to];
};

const get_countries = async (currency) => {
    const countries = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
    return countries.data.map((country) => country.name);
}


const convert_currency = async (from, to, amount) => {
    const countries =  await get_countries(to);
    const rate =  await get_exchange_rate(from, to);
    const exchange_amount = amount * rate;

    return `${amount} ${from} is worth ${exchange_amount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
};

convert_currency("EUR", "USD", 300).then((data) => {
    console.log(data);
})