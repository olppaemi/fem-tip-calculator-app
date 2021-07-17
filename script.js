const inputBill = document.getElementById("bill");
const inputPersonAmount = document.getElementById("person-amount");
const inputsTip = document.querySelectorAll(".tip input");
const inputCustomTip = document.getElementById("input-custom-tip");

const resetBtn = document.getElementById("reset");
const form = document.querySelector("form");
const personTipAmount = document.getElementById("person-tip-amount");
const total = document.getElementById("total");

const invalidFeedback = document.querySelector('.invalid-feedback');


let bill = null, tip = null, people = null;

function calculate() {
    if (bill && tip && people) {
        console.log(bill, tip, people)
        const billPerPerson = bill / people;
        const tipAmountPerPerson = billPerPerson * (tip / 100);
        const totalAmount = billPerPerson + tipAmountPerPerson;

        personTipAmount.textContent = `\$${tipAmountPerPerson.toFixed(2)}`;
        total.textContent = `\$${totalAmount.toFixed(2)}`;
    } else {
        personTipAmount.textContent = "$0.00";
        total.textContent = "$0.00";
    }
}

function removeAllActiveClass(elements) {
    elements.forEach((el) => el.parentNode.classList.remove("active"));
}

inputBill.addEventListener("input", (e) => {
    bill = parseFloat(e.target.value);
    calculate();
});

inputsTip.forEach((input) => {
    input.addEventListener("click", (e) => {
        removeAllActiveClass(inputsTip);
        const label = input.parentNode;
        label.classList.add("active");
        tip = parseFloat(e.target.value);
        console.log(tip);
        calculate();
    });
});

inputCustomTip.addEventListener("input", (e) => {
    tip = parseFloat(e.target.value);
    calculate();
});

inputPersonAmount.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value == 0) {
        invalidFeedback.textContent = "Can't be zero";
        inputPersonAmount.classList.add("invalid");
    } else {
        invalidFeedback.textContent = "";
        inputPersonAmount.classList.remove("invalid");
    }
    people = parseFloat(value);
    calculate();
});

resetBtn.addEventListener("click", () => {
    form.reset();
    personTipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
    bill = null;
    tip = null;
    people = null;
});