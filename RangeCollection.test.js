const RangeCollection = require("./RangeCollection");


test("givenTests", () => {
    const rc = new RangeCollection();
    rc.add([1, 5]);
    expect(rc.toString()).toBe("[1, 5)");

    rc.add([10, 20]);
    expect(rc.toString()).toBe("[1, 5) [10, 20)");

    rc.add([20, 20]);
    expect(rc.toString()).toBe("[1, 5) [10, 20)");

    rc.add([20, 21]);
    expect(rc.toString()).toBe("[1, 5) [10, 21)");

    rc.add([2, 4]);
    expect(rc.toString()).toBe("[1, 5) [10, 21)");

    rc.add([3, 8]);
    expect(rc.toString()).toBe("[1, 8) [10, 21)");

    rc.remove([10, 10]);
    expect(rc.toString()).toBe("[1, 8) [10, 21)");

    rc.remove([10, 11]);
    expect(rc.toString()).toBe("[1, 8) [11, 21)");

    rc.remove([15, 17]);
    expect(rc.toString()).toBe("[1, 8) [11, 15) [17, 21)");

    rc.remove([3, 19]);
    expect(rc.toString()).toBe("[1, 3) [19, 21)");
});


test("tests for adding 1", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([4, 5]);
    expect(rc.toString()).toBe("[1, 2) [4, 5)");

    rc.add([6, 7]);
    expect(rc.toString()).toBe("[1, 2) [4, 5) [6, 7)");
});


test("tests for adding 2", () => {
    const rc = new RangeCollection();

    rc.add([4, 5]);
    expect(rc.toString()).toBe("[4, 5)");

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2) [4, 5)");

    rc.add([6, 7]);
    expect(rc.toString()).toBe("[1, 2) [4, 5) [6, 7)");
});


test("tests for adding 3", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([2, 3]);
    expect(rc.toString()).toBe("[1, 3)");

});


test("tests for adding 4", () => {
    const rc = new RangeCollection();

    rc.add([2, 3]);
    expect(rc.toString()).toBe("[2, 3)");

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 3)");

});


test("tests for adding 5", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([3, 4]);
    expect(rc.toString()).toBe("[1, 2) [3, 4)");

});


test("tests for adding 6", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([4, 5]);
    expect(rc.toString()).toBe("[1, 2) [4, 5)");

    rc.add([2, 4]);
    expect(rc.toString()).toBe("[1, 5)");
});

test("tests for adding 7", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([0, 4]);
    expect(rc.toString()).toBe("[0, 4)");
});

test("tests for adding 8", () => {
    const rc = new RangeCollection();

    rc.add([0, 4]);
    expect(rc.toString()).toBe("[0, 4)");

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[0, 4)");
});

test("tests for removing 1", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.remove([1, 2]);
    expect(rc.toString()).toBe("");
});

test("tests for removing 2", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.remove([0, 10]);
    expect(rc.toString()).toBe("");
});

test("tests for removing 3", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([15, 20]);
    expect(rc.toString()).toBe("[1, 2) [15, 20)");

    rc.remove([0, 10]);
    expect(rc.toString()).toBe("[15, 20)");
});

test("tests for removing 4", () => {
    const rc = new RangeCollection();

    rc.add([1, 2]);
    expect(rc.toString()).toBe("[1, 2)");

    rc.add([15, 20]);
    expect(rc.toString()).toBe("[1, 2) [15, 20)");

    rc.remove([0, 17]);
    expect(rc.toString()).toBe("[17, 20)");
});

test("tests for removing 5", () => {
    const rc = new RangeCollection();

    rc.add([1, 5]);
    expect(rc.toString()).toBe("[1, 5)");

    rc.add([10, 15]);
    expect(rc.toString()).toBe("[1, 5) [10, 15)");

    rc.remove([4, 11]);
    expect(rc.toString()).toBe("[1, 4) [11, 15)");
});

test("tests for removing 6", () => {
    const rc = new RangeCollection();

    rc.add([1, 5]);
    expect(rc.toString()).toBe("[1, 5)");

    rc.remove([0, 2]);
    expect(rc.toString()).toBe("[2, 5)");
});

test("tests for removing 7", () => {
    const rc = new RangeCollection();

    rc.add([1, 5]);
    expect(rc.toString()).toBe("[1, 5)");

    rc.remove([1, 2]);
    expect(rc.toString()).toBe("[2, 5)");
});

test("tests for removing 8", () => {
    const rc = new RangeCollection();

    rc.add([1, 5]);
    expect(rc.toString()).toBe("[1, 5)");

    rc.remove([3, 6]);
    expect(rc.toString()).toBe("[1, 3)");

});

test("tests for removing 8", () => {
    const rc = new RangeCollection();

    rc.add([1, 10]);
    expect(rc.toString()).toBe("[1, 10)");

    rc.remove([5, 6]);
    expect(rc.toString()).toBe("[1, 5) [6, 10)");
});

test("tests for removing 9", () => {
    const rc = new RangeCollection();

    rc.add([1, 10]);
    expect(rc.toString()).toBe("[1, 10)");

    rc.remove([11, 12]);
    expect(rc.toString()).toBe("[1, 10)");
});

test("tests for removing 10", () => {
    const rc = new RangeCollection();

    rc.add([11, 12]);
    expect(rc.toString()).toBe("[11, 12)");

    rc.remove([1, 10]);
    expect(rc.toString()).toBe("[11, 12)");
});


test("not an array should throw error", () => {
    const rc = new RangeCollection();

    function addNotAnArray() {
        rc.add("not an array");
    }

    expect(addNotAnArray).toThrowError("Expected an array but received ");
});

test("different than 2 elements should throw error", () => {
    const rc = new RangeCollection();

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
    const rc = new RangeCollection();

    function stringsInArray() {
        rc.add(["ok", 1]);
    }

    expect(stringsInArray).toThrowError("Expected both values to be numbers.");
});

test("start after end should throw error", () => {
    const rc = new RangeCollection();

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
