'use strict';
const axios = require('axios');
async function homePageValues(){
    let userContent = await axios({
        baseURL: 'http://localhost/',
        url: 'home/',
        method: 'get',
        params: {_id: '1'},
        }).then(resp => {
        console.log(resp.data);
        return resp.data;
    }).catch(err => console.log("Shit")); //http get request (AJAX)
    /*
    let currentConsumption = userContent.consumption;
    let currentProduction = userContent.production
    let currentWind = userContent.wind;
    let buffer = userContent.buffer;
    */
    let consumerContent = await axios({
        baseURL: 'http://localhost/consumer/',
        url: 'consumption/',
        method: 'get',
        }).then(resp => {
        console.log(resp.data);
        return resp.data;
    }); //http get request (AJAX)

    let totalConsumption = calcTotalConsumption(consumerContent);

    function calcTotalConsumption(consumers)
    {
        let i = 0;
        let sum = 0;
        while(i<consumers.length)
        {
            sum += consumers[i].Consumption;
            i++
        }
        return sum;
    }
}
homePageValues();