const initialTitle = document.querySelector(".__financing-calculator-initial-title");

//Page 1 elements
const page1 = document.querySelector(".__financing-calculator-1");
const equipmentCostInput = document.querySelector(".__financing-calculator-input");
const equipmentCostInputFake = document.querySelector(".__financing-calculator-input-fake-value");
const page1Button = document.querySelector(".__financing-calculator-button-1");

// Page 2 elements
const page2 = document.querySelector(".__financing-calculator-2");
const page2EquipmentCostTextEdit = document.querySelector(
  ".__financing-calculator-2-equipment-cost-edit"
);
const page2EquipmentCostTextDiv = document.querySelector(
  ".__financing-calculator-2-credit-rating-text-div"
);
const page2EquipmentCostText = document.querySelector(".__financing-calculator-2-equipment-cost");
const creditScoreOption = document.querySelectorAll(".__financing-calculator-credit-option");
const creditScoreContainer = document.querySelector(
  ".__financing-calculator-credit-options-container"
);
const creditScoreQuestion = document.querySelector(
  ".__financing-calculator-2-credit-rating-question"
);
const creditScoreUserTextEdit = document.querySelector(
  ".__financing-calculator-2-credit-rating-text-edit"
);
const creditScoreUserText = document.querySelector(".__financing-calculator-2-credit-rating-text");
const page2BottomButton = document.querySelector(".__financing-calculator-2-bottom");
const seeMyQuoteButton = document.querySelector(".__financing-calculator-2-see-my-quote");

//page 3
const page3 = document.querySelector(".__financing-calculator-3");
const quoteValueText = document.querySelector(".__financing-calculator-3-quote-value");
const termOption = document.querySelectorAll(".__financing-calculator-3-option");
const rateRange2 = document.querySelector(".__refinancing-calculator-3-rate-range-2");
const rateRange3 = document.querySelector(".__refinancing-calculator-3-rate-range-3");
const rateRange4 = document.querySelector(".__refinancing-calculator-3-rate-range-4");
const rateRange5 = document.querySelector(".__refinancing-calculator-3-rate-range-5");
const rateRange6 = document.querySelector(".__refinancing-calculator-3-rate-range-6");
const rateRange7 = document.querySelector(".__refinancing-calculator-3-rate-range-7");
const applyNowButton = document.querySelector(".__financing-calculator-3-apply-button");
const startOver = document.querySelectorAll(".__financing-calculator-start-over");

//page 4
const page4 = document.querySelector(".__financing-calculator-4");
const financeAmount = document.querySelector(".__financing-calculator-4-finance-amount");
const financeTermAmount = document.querySelector(".__financing-calculator-4-loan-term");
const financeMonthlyPayment = document.querySelector(".__financing-calculator-4-monthly-payment");

// fake cursor
const cursor = document.createElement("span");
cursor.classList.add("__financing-calculator-blinking-cursor");

//hiding class
const hideClass = "__financing-calculator-hide-page";

//data
let selectedTermOption;
let creditScore = "";
let equipmentCost = "";
let monthlyPayment = "";
let loanTerm = "";

const rates = {
  two: {
    excellent: {
      rate1: 0.0462,
      rate2: 0.04851,
    },
    great: {
      rate1: 0.04683,
      rate2: 0.04914,
    },
    good: {
      rate1: 0.04788,
      rate2: 0.050295,
    },
    fair: {
      rate1: 0.055625,
      rate2: 0.0584472,
    },
  },
  three: {
    excellent: {
      rate1: 0.03161,
      rate2: 0.03318,
    },
    great: {
      rate1: 0.03224,
      rate2: 0.03381,
    },
    good: {
      rate1: 0.033285,
      rate2: 0.034965,
    },
    fair: {
      rate1: 0.039278,
      rate2: 0.0412776,
    },
  },
  four: {
    excellent: {
      rate1: 0.02415,
      rate2: 0.02541,
    },
    great: {
      rate1: 0.02478,
      rate2: 0.02604,
    },
    good: {
      rate1: 0.025725,
      rate2: 0.026985,
    },
    fair: {
      rate1: 0.031282,
      rate2: 0.0328104,
    },
  },
  five: {
    excellent: {
      rate1: 0.01974,
      rate2: 0.02069,
    },
    great: {
      rate1: 0.02037,
      rate2: 0.02132,
    },
    good: {
      rate1: 0.02121,
      rate2: 0.02226,
    },
    fair: {
      rate1: 0.02646,
      rate2: 0.0277536,
    },
  },
  six: {
    excellent: {
      rate1: 0.0168,
      rate2: 0.01754,
    },
    great: {
      rate1: 0.01733,
      rate2: 0.01827,
    },
    good: {
      rate1: 0.018165,
      rate2: 0.019005,
    },
    fair: {
      rate1: 0.022932,
      rate2: 0.024108,
    },
  },
  seven: {
    excellent: {
      rate1: 0.0147,
      rate2: 0.01544,
    },
    great: {
      rate1: 0.01533,
      rate2: 0.01607,
    },
    good: {
      rate1: 0.016065,
      rate2: 0.016905,
    },
    fair: {
      rate1: 0.020698,
      rate2: 0.021756,
    },
  },
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function setMonthlyPayment() {
  if (selectedTermOption.dataset.term === "2") {
    monthlyPayment = `${rateRange2.textContent}/mo`;
  } else if (selectedTermOption.dataset.term === "3") {
    monthlyPayment = `${rateRange3.textContent}/mo`;
  } else if (selectedTermOption.dataset.term === "4") {
    monthlyPayment = `${rateRange4.textContent}/mo`;
  } else if (selectedTermOption.dataset.term === "5") {
    monthlyPayment = `${rateRange5.textContent}/mo`;
  } else if (selectedTermOption.dataset.term === "6") {
    monthlyPayment = `${rateRange6.textContent}/mo`;
  } else if (selectedTermOption.dataset.term === "7") {
    monthlyPayment = `${rateRange7.textContent}/mo`;
  }
}

// event listeners handlers
function handleEquipmentCostChange(e) {
  if (!e.target.value) {
    equipmentCostInputFake.textContent = "$";
  } else {
    equipmentCostInputFake.textContent = formatter.format(e.target.value);
  }

  if (e.target.value >= 10000 && e.target.value <= 9999999) {
    page1Button.disabled = false;
  } else {
    page1Button.disabled = true;
  }

  equipmentCostInputFake.appendChild(cursor);
  cursor.textContent = "|";
}

function handleEquipmentCostFocus(e) {
  if (e.target.value) {
    equipmentCostInputFake.textContent = formatter.format(e.target.value);
  } else {
    equipmentCostInputFake.textContent = "$";
  }

  equipmentCostInputFake.appendChild(cursor);
  cursor.textContent = "|";
}

function handleEquipmentCostBlur(e) {
  if (!e.target.value) {
    equipmentCostInputFake.textContent = null;
  }

  equipmentCostInputFake.appendChild(cursor);
  cursor.textContent = null;
}

function handlePage1Click() {
  page1.classList.add(hideClass);
  page2.classList.remove(hideClass);
  page2EquipmentCostText.textContent = `The equipment I want to finance costs ${formatter.format(
    equipmentCostInput.value
  )}`;

  equipmentCost = equipmentCostInput.value;
}

function handleCreditScoreSelection(e) {
  creditScore = e.currentTarget.dataset.value;

  creditScoreContainer.classList.add(hideClass);
  creditScoreQuestion.classList.add(hideClass);
  creditScoreUserText.textContent = ` I estimate my credit rating to be ${creditScore}`;
  page2EquipmentCostTextDiv.classList.remove(hideClass);
  page2BottomButton.classList.remove(hideClass);
}

function handleSeeMyQuoteClick(e) {
  page2.classList.add(hideClass);

  initialTitle.classList.add(hideClass);

  rateRange2.textContent = `$ ${(equipmentCost * rates.two[creditScore].rate1).toFixed()} - ${(
    equipmentCost * rates.two[creditScore].rate2
  ).toFixed()}`;
  rateRange3.textContent = `$ ${(equipmentCost * rates.three[creditScore].rate1).toFixed()} - ${(
    equipmentCost * rates.three[creditScore].rate2
  ).toFixed()}`;
  rateRange4.textContent = `$ ${(equipmentCost * rates.four[creditScore].rate1).toFixed()} - ${(
    equipmentCost * rates.four[creditScore].rate2
  ).toFixed()}`;
  rateRange5.textContent = `$ ${(equipmentCost * rates.five[creditScore].rate1).toFixed()} - ${(
    equipmentCost * rates.five[creditScore].rate2
  ).toFixed()}`;
  rateRange6.textContent = `$ ${(equipmentCost * rates.six[creditScore].rate1).toFixed()} - ${(
    equipmentCost * rates.six[creditScore].rate2
  ).toFixed()}`;
  rateRange7.textContent = `$ ${(equipmentCost * rates.seven[creditScore].rate1).toFixed()} - ${(
    equipmentCost * rates.seven[creditScore].rate2
  ).toFixed()}`;

  page3.classList.remove(hideClass);
  quoteValueText.textContent = `Here's your estimated quote for ${formatter.format(equipmentCost)}!`;
}

function handleTermOptionClick(e) {
  if (selectedTermOption) {
    selectedTermOption.classList.remove("__financing-calculator-3-option-selected");
  }

selectedTermOption = e.currentTarget;
  
  selectedTermOption.classList.add("__financing-calculator-3-option-selected");

  applyNowButton.disabled = false;
}

function handleApplyNowClick() {
  loanTerm = `${selectedTermOption.dataset.term} years`;
  setMonthlyPayment();
  console.log(rateRange2.textContent);

  financeAmount.textContent = formatter.format(equipmentCost);
  financeTermAmount.textContent = loanTerm;
  financeMonthlyPayment.textContent = monthlyPayment;

  page3.classList.add(hideClass);
  page4.classList.remove(hideClass);
}

function handleEquipmentCostEditClick() {
  page1.classList.remove(hideClass);
}

function handleCreditScoreEditClick() {
  creditScoreContainer.classList.remove(hideClass);
  creditScoreQuestion.classList.remove(hideClass);
  page2EquipmentCostTextDiv.classList.add(hideClass);
  page2BottomButton.classList.add(hideClass);
}

function handleStartOverClick() {
  page4.classList.add(hideClass);
  page3.classList.add(hideClass);
  page2.classList.add(hideClass);
  initialTitle.classList.remove(hideClass);
  if (selectedTermOption) {
    selectedTermOption.classList.remove("__financing-calculator-3-option-selected");
  }
  page1.classList.remove(hideClass);
  creditScoreContainer.classList.remove(hideClass);
  creditScoreQuestion.classList.remove(hideClass);
  page2EquipmentCostTextDiv.classList.add(hideClass);
  page2BottomButton.classList.add(hideClass);
  equipmentCostInput.value = "";
  equipmentCostInputFake.textContent = "";
}

// event listeners
equipmentCostInput.addEventListener("input", handleEquipmentCostChange);

equipmentCostInput.addEventListener("focus", handleEquipmentCostFocus);

equipmentCostInput.addEventListener("blur", handleEquipmentCostBlur);

page1Button.addEventListener("click", handlePage1Click);

creditScoreOption.forEach((item) => {
  item.addEventListener("click", handleCreditScoreSelection);
});

seeMyQuoteButton.addEventListener("click", handleSeeMyQuoteClick);

termOption.forEach((item) => {
  item.addEventListener("click", handleTermOptionClick);
});

applyNowButton.addEventListener("click", handleApplyNowClick);

page2EquipmentCostTextEdit.addEventListener("click", handleEquipmentCostEditClick);

creditScoreUserTextEdit.addEventListener("click", handleCreditScoreEditClick);

startOver.forEach((item) => {
  item.addEventListener("click", handleStartOverClick);
});
