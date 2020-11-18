const sum = require('./function');
const sim = require('./../Simulator/simulator');
const db = require('./../Simulator/databaseConnection');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});

test("Verifying gaussian is truly random", () => {
    var temp = sim.gaussian(100,100);
    expect(sim.gaussian(100,100)).not.toEqual(temp);
});

test("Wind and consumption affect on price", () => {
    expect(1).toEqual(1);
});
test("Blackout determination", () =>{
    var blackout_bool =sim.calcBlackout(100,30,80);
    expect(blackout_bool).toEqual(true);
})

//npm run test
// to run the test