//USD => UAH
// 1 USD is worth XX 0.84118. You can spend it in the following countries:

const axios = require("axios");

const get_exchange_rate = (from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
        let rate = response.data.rates[to];
        if(rate){
            return rate;
        }else{
            throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
        }
    }).catch((e) => {
        throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
    });
};

const get_countries = (currency) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
        if(response.data.length > 0){
            return response.data.map((country) => country.name);
        } else {
            throw new Error(`Unable to get countries that used ${currency}`)
        }

    }).catch((e) => {
        throw new Error(`Unable to get countries that used ${currency}`)
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
    }).catch((e) => {
        throw new Error(`Unable to get currency ${amount} from ${from} to ${to}`)
    });
};

convert_currency("EUR", "USD", 300).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e);
})