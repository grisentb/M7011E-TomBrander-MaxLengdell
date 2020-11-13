

function simulateWind(currentWind)
{
    wind = currentWind;
    return wind;
}

function simulateConsumption(currentConsumption)
{
    consumption = currentConsumption;
    return consumption;
}

function calcPrice(wind, currentConsumption)
{
    price = 1.5;
    return price;
}


function runSim()
{
    wind = Math.random(0,10); // m/s
    consumption = Math.random(0,800) // kwh
    price = -1;
    while(true)
    {
        wind = simulateWind(wind);
        consumption =  simulateConsumption(consumption);

        price = calcPrice(wind, consumption);
        //PUSH PRICE TO DB
    }
}