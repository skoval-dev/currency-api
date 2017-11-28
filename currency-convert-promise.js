//USD => UAH
// 1 USD is worth XX 0.84118. You can spend it in the following countries:

const axios = require("axios");

const get_exchange_rate = (from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    });
};

const get_countries = (currency) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
        return response.data.map((country) => country.name);
    });
}

const convert_currency = (from, to, amount) => {
    let countries;
    return get_countries(to).then((temp_countries) => {
        countries = temp_countries;
        return get_exchange_rate(from, to);
    }).then((rate) => {
        const exchange_amount = amount * rate;

        return `${amount} ${from} is worth ${exchange_amount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
    });
};

convert_currency("EUR", "USD", 300).then((data) => {
    console.log(data);
})