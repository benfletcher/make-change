# make-change

Node module that accepts input in the form of an array of bills to make change for and optional params setting the starting coin count as well as denominations.

## Usage

```javascript
const changer = new MakeChange({ bills: [10, 5, 1] });

const output = changer.processBills();
```

the output looks like the following:

```javascript
[
  [20, { success: true, message: "Success", "25": 80 }],
  [20, { success: true, message: "Success", "5": 100, "10": 100, "25": 20 }],
  [
    5,
    {
      success: false,
      message:
        "Sorry only $1 in coins remaining.\nCan't make change for a $5 bill."
    }
  ]
];
```
