const sum = require('./function');
const sim = require('./../Simulator/simulator');
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});

test("Verifying gaussian is truly random", () => {
    expect(sim.gaussian()).toBe
})