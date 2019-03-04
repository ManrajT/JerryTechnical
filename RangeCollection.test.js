const RangeCollection = require("./RangeCollection");

const rc = new RangeCollection();

test("givenTests", () => {
    rc.add([1, 5]);
    expect(rc.print()).toBe("[1, 5)");

    rc.add([10, 20]);
    expect(rc.print()).toBe("[1, 5) [10, 20)");

    rc.add([20, 20]);
    expect(rc.print()).toBe("[1, 5) [10, 20)");

    rc.add([20, 21]);
    expect(rc.print()).toBe("[1, 5) [10, 21)");

    rc.add([2, 4]);
    expect(rc.print()).toBe("[1, 5) [10, 21)");

    rc.add([3, 8]);
    expect(rc.print()).toBe("[1, 8) [10, 21)");

    rc.remove([10, 10]);
    expect(rc.print()).toBe("[1, 8) [10, 21)");

    rc.remove([10, 11]);
    expect(rc.print()).toBe("[1, 8) [11, 21)");

    rc.remove([15, 17]);
    expect(rc.print()).toBe("[1, 8) [11, 15) [17, 21)");

    rc.remove([3, 19]);
    expect(rc.print()).toBe("[1, 3) [19, 21)");
});

test("not an array should throw error", () => {
    function addNotAnArray() {
        rc.add("not an array");
    }

    expect(addNotAnArray).toThrowError("Expected an array but received ");
});

test("different than 2 elements should throw error", () => {
    function threeElements() {
        rc.add([0, 1, 2]);
    }

    expect(threeElements).toThrowError("Expected two values in array but received");

    function zeroElements() {
        rc.add([]);
    }

    expect(zeroElements).toThrowError("Expected two values in array but received");
});

test("array without numbers should throw error", () => {
    function stringsInArray() {
        rc.add(["ok", 1]);
    }

    expect(stringsInArray).toThrowError("Expected both values to be numbers.");
});

test("start after end should throw error", () => {
    function startAfterEnd() {
        rc.add([2, 1]);
    }

    expect(startAfterEnd).toThrowError("Expected start of range to be before or equal to end of range.");

    function startAfterEndNegatives() {
        rc.add([0, -1]);
    }

    expect(startAfterEndNegatives).toThrowError("Expected start of range to be before or equal to end of range.");

    function startEqualToEnd() {
        rc.add([1, 1]);
    }

    expect(startEqualToEnd).not.toThrowError();
});
