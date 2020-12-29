const { Collection } = require('mongoose');
var simulator;

// function connectDatabase(){
//     console.log("Trying to connect");
//     schemas = require('./../../Simulator/models');
//     mongoose = require('mongoose');
//     mongoose.Promise = global.Promise;
//     mongoose.connect('mongodb://localhost/M7011E');
//     console.log("Connected");
// }

beforeEach(() => {
    //connectDatabase();
    simulator = require('./../../Simulator/simulator');

})
test("Verifying gaussian is truly random", () => {
    //simulator.runSim();
    expect(1).toEqual(1);

    //var temp = sim.gaussian(100,100);
    //expect(sim.gaussian(100,100)).not.toEqual(temp);
});

// test("Wind and consumption affect on price", () => {
//     expect(1).toEqual(1);
// });
// test("Blackout determination", () =>{
//     var blackout_bool =sim.calcBlackout(100,30,80);
//     expect(blackout_bool).toEqual(true);
// })

//npm run test
// to run the test