const MakeChange = require("../index");

describe("Make change for specified list of bills", () => {
  it("accepts a list of bills", () => {
    const bills = [5, 10];
    const changer = new MakeChange({ bills });
    expect(changer.bills).toEqual([5, 10]);
  });

  it("properly calculates total coins value", () => {
    const changer = new MakeChange();
    expect(changer.totalCoinValue()).toBe(41);
  });

  it("can determine whether change is possible for a tenner", () => {
    const changer = new MakeChange();
    expect(changer.canMakeChange(10)).toBeTruthy();
  });

  it("can determine whether change is possible for a benjamin", () => {
    const changer = new MakeChange();
    expect(changer.canMakeChange(100)).toBeFalsy();
  });

  it("message if can't make change", () => {
    const bills = [100, 50];
    const changer = new MakeChange({ bills });
    const output = changer.processOneBill(100);

    expect(output.success).toBeFalsy;
  });

  it("calculates coins for one dollar", () => {
    const bills = [1, 5, 10];
    const changer = new MakeChange({ bills });
    const resultCoins = changer.processOneBill(1);
    expect(resultCoins[25]).toEqual(4);
  });

  it("calculates coins for 5 dollar bill", () => {
    const bills = [5, 10];
    const changer = new MakeChange({ bills });
    const resultCoins = changer.processOneBill(5);
    expect(resultCoins[25]).toEqual(20);
  });

  it("can process list of coins without throwing", () => {
    const bills = [20, 5, 10];
    const changer = new MakeChange({ bills });

    expect(changer.processBills.bind(changer)).not.toThrow();
  });

  it("can process list of 1 coin", () => {
    const bills = [20];
    const changer = new MakeChange({ bills });
    const output = changer.processBills();
    const expected = [[20, { success: true, message: "Success", 25: 80 }]];

    expect(output).toEqual(expected);
  });

  it("can process list of 2 coins", () => {
    const bills = [20, 5];
    const changer = new MakeChange({ bills });
    const output = changer.processBills();
    const expected = [
      [20, { success: true, message: "Success", 25: 80 }],
      [5, { success: true, message: "Success", 25: 20 }]
    ];

    expect(output).toEqual(expected);
  });

  it("can process list of coins and use all coins", () => {
    const bills = [20, 20, 1];
    const changer = new MakeChange({ bills });
    const output = changer.processBills();

    const expected = [
      [20, { success: true, message: "Success", "25": 80 }],
      [
        20,
        { success: true, message: "Success", "5": 100, "10": 100, "25": 20 }
      ],
      [1, { success: true, message: "Success", "1": 100 }]
    ];

    expect(output).toEqual(expected);
  });

  it("can process list of coins and run out of coins", () => {
    const bills = [20, 20, 5];
    const changer = new MakeChange({ bills });
    const output = changer.processBills();

    const expected = [
      [20, { success: true, message: "Success", "25": 80 }],
      [
        20,
        { success: true, message: "Success", "5": 100, "10": 100, "25": 20 }
      ],
      [
        5,
        {
          success: false,
          message:
            "Sorry only $1 in coins remaining.\nCan't make change for a $5 bill."
        }
      ]
    ];

    expect(output).toEqual(expected);
  });

  it("can process list of coins and skip large bills", () => {
    const bills = [20, 100, 20, 5, 1];
    const changer = new MakeChange({ bills });
    const output = changer.processBills();
    console.log(output);
    const expected = [
      [20, { "25": 80, success: true, message: "Success" }],
      [
        100,
        {
          success: false,
          message:
            "Sorry only $21 in coins remaining.\nCan't make change for a $100 bill."
        }
      ],
      [
        20,
        { "5": 100, "10": 100, "25": 20, success: true, message: "Success" }
      ],
      [
        5,
        {
          success: false,
          message:
            "Sorry only $1 in coins remaining.\nCan't make change for a $5 bill."
        }
      ],
      [1, { "1": 100, success: true, message: "Success" }]
    ];

    expect(output).toEqual(expected);
  });
});
