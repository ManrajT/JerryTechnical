// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {

    constructor() {
        this._rangeCollection = [];
    }

    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(inputRange) {
        this._checkRange(inputRange);
        //insert new array approximately
        if (this._rangeCollection.length === 0) {
            this._rangeCollection.push(inputRange);
        }
        for (let i = 0; i < this._rangeCollection.length; i++) {
            let currRange = this._rangeCollection[i];
            if (inputRange[0] < currRange[0]) {
                // if input range starts before current range, insert it before
                this._rangeCollection.splice(i, 0, inputRange);
                break
            } else if (inputRange[0] >= currRange[0] && inputRange[1] <= currRange[1]) {
                //do nothing when input range fits within current range
                break;
            } else if (i === this._rangeCollection.length - 1) {
                //insert input at end if reached
                this._rangeCollection.push(inputRange);
                break;
            }
        }
        //then simplify to proper form
        this._simplifyRange();
    }

    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(inputRange) {
        this._checkRange(inputRange);
        if (inputRange[0] === inputRange[1]) {
            return;
        }
        // TODO: implement this
    }

    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
        console.log(this.toString());
    }

    /**
     * Private method for checking range input value.  Throws exceptions if problems found.
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     * @private
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

    /**
     * Get string representation of range collection
     * @returns {string} representation of range collection
     */
    toString() {
        var stringRepr = "";
        for (let i = 0; i <= this._rangeCollection.length - 1; i++) {
            let range = this._rangeCollection[i];
            if (i === 0) {
                stringRepr += this._getSetRepr(range[0], range[1]);
                continue
            }
            stringRepr += " " + this._getSetRepr(range[0], range[1]);
        }
        return stringRepr;
    }

    /**
     * Return the set representation of a range array (ie. [1, 2] => [1, 2)
     * @param start  - number of start of array
     * @param end  - number of end of array
     * @returns {string}
     * @private
     */
    _getSetRepr(start, end) {
        return "[" + start + ", " + end + ")";
    }

    /**
     * Simplifies the range collection to clear any overlaps
     * @private
     */
    _simplifyRange() {
        let simplifiedRangeCollection = [];
        this._rangeCollection.forEach(function (currentRange, index) {
            if (index === 0) {
                simplifiedRangeCollection.push(currentRange);
                return
            }
            let latestIndexInNewCollection = simplifiedRangeCollection.length - 1;
            let priorRange = simplifiedRangeCollection[latestIndexInNewCollection];
            if (priorRange[1] >= currentRange[0] - 1) { // - 1 to support joining sequential ranges
                //if priorRange ends later than beginning of currentRange
                //then join ranges together and replace priorRange with joinedRange
                let joinedRange = [];
                if (currentRange[1] > priorRange[1]) {
                    joinedRange = [priorRange[0], currentRange[1]];
                } else {
                    joinedRange = [priorRange[0], priorRange[1]]
                }
                simplifiedRangeCollection.splice(latestIndexInNewCollection, 1, joinedRange);
            } else {
                //if not joining arrays, just add currentRange to new collection
                simplifiedRangeCollection.push(currentRange);
            }
        });
        this._rangeCollection = simplifiedRangeCollection;
    }
}


module.exports = RangeCollection;
