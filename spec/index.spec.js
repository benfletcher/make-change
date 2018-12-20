const makeChange = require("../index");

describe("Make change for specified list of bills", () => {
  it("accepts a list of bills", () => {
    const bills = [5, 10];
    const changer = new makeChange({ bills });
    expect(changer.bills).toEqual([5, 10]);
  });

  it("properly calculates total coins value", () => {
    const changer = new makeChange();
    expect(changer.totalCoinValue()).toBe(41);
  });

  it("can determine whether change is possible for a tenner", () => {
    const changer = new makeChange();
    expect(changer.canMakeChange(10)).toBeTruthy();
  });

  it("can determine whether change is possible for a benjamin", () => {
    const changer = new makeChange();
    expect(changer.canMakeChange(100)).toBeFalsy();
  });

  it("can process one bill from list", () => {
    const bills = [1, 5, 10];
    const changer = new makeChange({ bills });
    const resultCoins = changer.processOneBillFromList();

    expect(resultCoins.get(25)).toEqual(4);
  });
});
