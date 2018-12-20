/*
Given an amount in Bills that can be (1,2,5,10,20,50,100) change it to coins that are (0.01,0.05,0.10,0.25). The machine needs to assume there is a finite number of coins.
 
Assumptions:
       
1.        Start with a 100 coins of each.
2.        machine should return the least amount of coins possible;
3.        Machine should display a message if it do not have have enough coins;
4.        Code should maintain the state of coins (coins left) throughout all the transaction till it runs out of the coin then it should exit.
5.        Deliver the code with test cases.

*/

const STARTING_COUNT = 100;
const COIN_VALUES = [25, 10, 5, 1];

class MakeChange {
  constructor({
    bills = [],
    startingCoinsQty = STARTING_COUNT,
    coinDenominations = COIN_VALUES
  } = {}) {
    this.bills = bills;

    this.coinCounts = new Map(
      coinDenominations
        .sort((a, b) => b - a) // code relies on decreasing values in order
        .map(value => [value, startingCoinsQty])
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

  processOneBill(billToChange) {
    let bill = billToChange * 100; // Dealing with $$ and base 2 Number type -> use pennies

    if (!this.canMakeChange(bill / 100)) {
      return {
        success: false,
        message:
          `Sorry only $${this.totalCoinValue()} in coins remaining.\n` +
          `Can't make change for a $${bill / 100} bill.`
      };
    }

    const coins = { success: true, message: "Success" };

    while (bill > 0 && this.coinCounts.size > 0) {
      const [biggestDenom, qty] = [...this.coinCounts][0];

      if (qty === 0) {
        this.coinCounts.delete(biggestDenom);
        continue;
      }

      bill -= biggestDenom;
      coins[biggestDenom] = (coins[biggestDenom] || 0) + 1;
      this.coinCounts.set(biggestDenom, qty - 1);
    }

    return coins;
  }

  processBills() {
    const output = [];
    while (this.bills.length > 0) {
      let bill = this.bills.shift();

      output.push([bill, this.processOneBill(bill)]);
    }

    return output;
  }
}

module.exports = MakeChange;
