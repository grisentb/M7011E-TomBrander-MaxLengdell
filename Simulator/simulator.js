function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    
    var y1;
    if(use_last) {
        y1 = y2;
        use_last = false;
    }
    else {
        var x1, x2, w;
        do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w  = x1 * x1 + x2 * x2;               
        } while( w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w))/w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
    }

    var retval = mean + stdev * y1;
    if(retval > 0) 
        return retval;
    return -retval;
}
function simulateWind(currentWind)
{
    let wind = gaussian(currentWind, 1);
    return wind;
}

function simulateConsumption(currentConsumption)
{

    let consumption = gaussian(currentConsumption, 10);
    return consumption;
}

function calcPrice(wind, currentConsumption)
{
    let price = 1.5;
    return price;
}


function runSim()
{
    let wind = gaussian(3.6, 1); // m/s
    let consumption = gaussian(70, 1) // kwh
    let price = -1;
    let tick = 1000;
    setInterval(function() {  
        wind = simulateWind(wind);
        consumption =  simulateConsumption(consumption);
        console.log("Price: " + price);
        console.log("Wind: " + wind);
        console.log("Consumption: " + consumption);
    
        price = calcPrice(wind, consumption);
        //PUSH PRICE TO DB
    }, tick);
}
runSim();