# make-change

### Module

Node module that accepts input in the form of an array of bills to make change for and optional params setting the starting coin count as well as denominations.

### Interactive CLI tool

Node interactive command line tool that utilizes the make-change module to create an interactive, responsive CLI tool for making change. Allows for configuration of bill denominations, coin denominations and coin quantities.

Exits upon exhausting change (or having less change than the smallest bill).

## Usage

### Module

```javascript
const changer = new MakeChange({ bills: [20, 100, 20, 5, 1] });

const output = changer.processBills();
```

### Interactive CLI tool

```javascript
# npm install
# node changer
```

Output sample (from above input):

```javascript
[
  [20, { coins: { "25": 80 }, success: true, message: "Success" }],
  [
    100,
    {
      success: false,
      message:
        "Sorry only $21 in coins remaining.\nCan't make change for a $100 bill.",
    },
  ],
  [
    20,
    {
      coins: { "5": 100, "10": 100, "25": 20 },
      success: true,
      message: "Success",
    },
  ],
  [
    5,
    {
      success: false,
      message:
        "Sorry only $1 in coins remaining.\nCan't make change for a $5 bill.",
    },
  ],
  [1, { coins: { "1": 100 }, success: true, message: "Success" }],
];
```
