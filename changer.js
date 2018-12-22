const inquirer = require("inquirer");
const MakeChange = require("./index");

const setupQuestions = [
  {
    type: "input",
    name: "coinDenoms",
    message:
      "What coin denominations, in cents, do you have (comma and/or space separated numbers)?",
    default: "25,10,5,1",
    validate: answer =>
      (/^[, \d]+$/.test(answer) &&
        answer
          .split(/[, ]+/)
          .map(Number)
          .every(n => n > 0)) ||
      "Whole, positive numbers separated by commas and/or spaces only please.",
    prefix: "",
  },
  {
    type: "input",
    name: "coinQty",
    message: "How many of each coin are you starting with?",
    default: "100",
    prefix: "",
  },
  {
    type: "input",
    name: "billDenoms",
    message: "What bill denominations do you have?",
    default: "1,5,10,20,50,100",
    prefix: "",
  },
];

inquirer.prompt(setupQuestions).then(answers => {
  const coinDenominations = answers.coinDenoms.split(/[, ]+/).map(Number);
  const startingCoinsQty = Number(answers.coinQty);

  const billQuestion = {
    type: "list",
    name: "nextBill",
    message: "Which bill are you making change for?",
    choices: answers.billDenoms.split(/[, ]+/),
    prefix: "",
  };

  const smallestBill = Math.min(...billQuestion.choices.map(Number));

  const makeChange = new MakeChange({ coinDenominations, startingCoinsQty });

  const getNextBill = () => {
    if (makeChange.totalCoinValue() < smallestBill) {
      console.log("Sorry, not enough coins to make more change.\nGoodbye!");
    } else {
      inquirer.prompt(billQuestion).then(({ nextBill }) => {
        console.log(makeChange.processOneBill(Number(nextBill)));
        getNextBill();
      });
    }
  };

  getNextBill();
});
