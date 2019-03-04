// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {

    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        this._checkRange(range);

        // TODO: implement this
    }

    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        this._checkRange(range);
        // TODO: implement this
    }

    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
        return "1";
    }

    /**
     * Private method for checking range input value.  Throws exceptions if problems found.
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    _checkRange(range) {
        if (!Array.isArray(range)) {
            throw new Error("Expected an array but received " + range);
        }
        if (!(range.length === 2)) {
            throw new Error("Expected two values in array but received " + range.length);
        }
        let start = range[0];
        let end = range[1];
        if (!(typeof start === "number" && typeof end === "number")) {
            throw new Error("Expected both values to be numbers.  Start:" + start + ",End:" + end);
        }
        if (start > end) {
            throw new Error("Expected start of range to be before or equal to end of range." +
                "Start:" + start + ",End:" + end)
        }
    }
}


module.exports = RangeCollection;
