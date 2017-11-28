//USD => UAH
// 1 USD is worth XX 0.84118. You can spend it in the following countries:

const axios = require("axios");

const get_exchange_rate = async (from, to) => {
    try {
        const exchange = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        const rate = exchange.data.rates[to];
        if(rate){
            return rate;
        }else{
            throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
        }
    } catch (e) {
        throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
    }
};

const get_countries = async (currency) => {
    try {
        const countries = await axios.get(
            `https://restcountries.eu/rest/v2/currency/${currency}`);

        if(countries.data.length > 0){
            return countries.data.map((country) => country.name);
        } else {
            throw new Error(`Unable to get countries that used ${currency}`)
        }
    } catch (e) {
        throw new Error(`Unable to get countries that used ${currency}`);
    }
}


const convert_currency = async (from, to, amount) => {
    try{
        const countries =  await get_countries(to);
        const rate =  await get_exchange_rate(from, to);
        const exchange_amount = amount * rate;

        return `${amount} ${from} is worth ${exchange_amount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
    } catch (e) {
        throw new Error(`Unable to get currency ${amount} from ${from} to ${to}`);
    }
};

convert_currency("USD", "EUR", 300).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e);
});