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
        let inputRangeStart = inputRange[0];
        let inputRangeEnd = inputRange[1];
        //insert new array approximately
        if (this._rangeCollection.length === 0) {
            this._rangeCollection.push(inputRange);
        }
        for (let i = 0; i < this._rangeCollection.length; i++) {
            let currRange = this._rangeCollection[i];
            let currRangeStart = currRange[0];
            let currRangeEnd = currRange[1];
            if (inputRangeStart < currRangeStart) {
                // if input range starts before current range, insert it before
                this._rangeCollection.splice(i, 0, inputRange);
                break
            } else if (inputRangeStart >= currRangeStart && inputRangeEnd <= currRangeEnd) {
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
        let inputRangeStart = inputRange[0];
        let inputRangeEnd = inputRange[1];
        for (let i=0; i<this._rangeCollection.length; i++) {
            let currRange = this._rangeCollection[i];
            let currRangeStart = currRange[0];
            let currRangeEnd = currRange[1];
            //if input range overlaps with current range...
            if (inputRangeEnd >= currRange[0] && inputRangeStart <= currRangeEnd) {
                //if your removing middle of the current array, then split into two arrays
                if (inputRangeStart > currRangeStart && inputRangeEnd < currRangeEnd) {
                    let newFirstArray = [currRangeStart, inputRangeStart];
                    let newSecondArray = [inputRangeEnd, currRangeEnd];
                    this._rangeCollection.splice(i, 1, newFirstArray, newSecondArray);
                //if your removing more than or equal to current array, delete it
                } else if (inputRangeEnd >= currRangeEnd && inputRangeStart <= currRangeStart) {
                    this._rangeCollection.splice(i, 1);
                    i--; //since an element has been removed, reprocess current index
                } else if (inputRangeEnd < currRangeEnd) {
                    let newArray = [inputRangeEnd, currRangeEnd];
                    this._rangeCollection.splice(i, 1, newArray);
                } else if (inputRangeStart > currRangeStart) {
                    let newArray = [currRange[0], inputRangeStart];
                    this._rangeCollection.splice(i, 1, newArray);
                }
            }
        }
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
            stringRepr += this._getSetRepr(range[0], range[1]) + " ";
        }
        return stringRepr.trim();
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
        simplifiedRangeCollection.push(this._rangeCollection[0]);
        this._rangeCollection.forEach(function (currRange, i) {
            if (i===0) {
                return;
            }
            let currRangeStart = currRange[0];
            let currRangeEnd = currRange[1];
            let priorRange = simplifiedRangeCollection[simplifiedRangeCollection.length - 1];
            let priorRangeStart = priorRange[0];
            let priorRangeEnd = priorRange[1];
            if (priorRangeEnd >= currRangeStart) { //
                //if priorRange ends later than beginning of currRange
                //then join ranges together and replace priorRange with joined range
                let joinedRange = [];
                if (currRangeEnd > priorRangeEnd) {
                    joinedRange = [priorRangeStart, currRangeEnd];
                } else {
                    joinedRange = [priorRangeStart, priorRangeEnd]
                }
                simplifiedRangeCollection.splice(simplifiedRangeCollection.length - 1, 1, joinedRange);
            } else {
                //if not joining arrays, just add currRange to new collection
                simplifiedRangeCollection.push(currRange);
            }
        });
        this._rangeCollection = simplifiedRangeCollection;
    }
}


module.exports = RangeCollection;
