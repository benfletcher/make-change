// var program = require("commander");

console.log(process.argv);

// program
//   .version("0.1.0")
//   .usage("[options] <ordered list of bills ...>")
//   .option("-b, --bills <n>", "Comma separated list of bills", billsList =>
//     billsList.split(",").map(Number)
//   )
//   .parse(process.argv);

// console.log(program.bills);

// while (program.change.length) {
//   const currBill = program.change;
// }

const STARTING_COUNT = 100;
const COIN_VALUES = [25, 10, 5, 1];

class makeChange {
  constructor({
    bills = [],
    startingCoinsQty = STARTING_COUNT,
    coinDenominations = COIN_VALUES
  } = {}) {
    this.bills = bills;
    this.coinCounts = new Map(
      coinDenominations.map(value => [value, startingCoinsQty])
    );
  }

  totalCoinValue() {
    return (
      [...this.coinCounts].reduce((sum, [denom, qty]) => sum + denom * qty, 0) /
      100
    );
  }

  canMakeChange(bill) {
    return this.totalCoinValue() >= bill;
  }

  processOneBillFromList() {
    const bill = this.bills.shift();

    const coins = new Map([[25, 4]]);

    return coins;
  }
}

module.exports = makeChange;
