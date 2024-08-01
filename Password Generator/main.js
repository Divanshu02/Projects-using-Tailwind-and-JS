let password = "";
let password_field = document.querySelector(".pwd-field");
let slider = document.querySelector(".slider");
let sliderVal = slider.value;
let passwordCnt = document.querySelector(".pwd-len");
let passwordLen = passwordCnt.textContent;
let symbols = "+-/*%$[#@!^&)(}{]";
let inputUpperCase = document.querySelector("#uppercase");
let inputLowerCase = document.querySelector("#Lowercase");
let inputNumbers = document.querySelector("#Numbers");
let inputSymbols = document.querySelector("#Symbols");
let indicator = document.querySelector(".indicator");
let generateButton = document.querySelector(".generate-btn");
let copyIcon = document.querySelector(".copy-icon");
let copyText = document.querySelector(".cpy-txt");

slider.addEventListener("input", (e) => {
  passwordLen = e.target.value;
  passwordCnt.textContent = passwordLen;
});

function generateNumber(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function generateUpperCase() {
  const num = generateNumber(65, 90);
  const ans = String.fromCharCode(num);
  return ans;
}

function generateLowerCase() {
  const num = generateNumber(97, 122);
  const ans = String.fromCharCode(num);
  return ans;
}

function generateNum() {
  return generateNumber(0, 9);
}

function generateSymbol() {
  const num = generateNumber(0, symbols.length);
  return symbols[num];
}

function setIndicator() {
  if (
    inputUpperCase.checked &&
    inputLowerCase.checked &&
    inputNumbers.checked &&
    inputSymbols.checked &&
    passwordLen >= 8
  ) {
    indicator.style.cssText = "color:#01ef48;text-shadow:4px 5px 20px gray";
  } else if (
    (inputUpperCase.checked && inputLowerCase.checked) ||
    (inputUpperCase.checked && inputNumbers.checked) ||
    (inputUpperCase.checked && inputSymbols.checked) ||
    (inputLowerCase.checked && inputNumbers.checked) ||
    (inputNumbers.checked && inputSymbols.checked)
  ) {
    indicator.style.cssText = "color:#D70040;text-shadow:4px 5px 20px gray";
  } else if (
    inputUpperCase.checked ||
    inputLowerCase.checked ||
    inputNumbers.checked ||
    inputSymbols.checked
  ) {
    indicator.style.cssText = "color:#c36532;text-shadow:4px 5px 20px gray";
  } else if (
    !(
      inputUpperCase.checked &&
      inputLowerCase.checked &&
      inputNumbers.checked &&
      inputSymbols.checked
    )
  ) {
    return 0;
  }
}

console.log('ad')

let arr = [
  generateUpperCase(),
  generateLowerCase(),
  generateNum(),
  generateSymbol(),
];
generateButton.addEventListener("click", () => {
  if (setIndicator() != 0) {
    let cnt = 0;
    setIndicator();
    if (passwordLen < 4) {
      passwordLen = 4;
      passwordCnt.textContent = passwordLen;
      slider.value = 4;
    }
    password = "";
    if (inputUpperCase.checked) {
      cnt++;
      password += generateUpperCase();
    }

    if (inputLowerCase.checked) {
      cnt++;
      password += generateLowerCase();
    }

    if (inputNumbers.checked) {
      cnt++;
      password += generateNum();
    }

    if (inputSymbols.checked) {
      cnt++;
      password += generateSymbol();
    }

    for (let i = 0; i < passwordLen - cnt; i++) {
      let num = generateNumber(0, 4);
      password += arr[num];
    }

    password_field.value = password;
  } else console.log("n");
});




async function checkCopy() {
    try {
      await navigator.clipboard.writeText(password);
      copyText.textContent = "Copied";
    } catch (e) {
        copyText.textContent = "Failed";
    }

    setTimeout(() => {
        copyText.textContent = "";
    }, 2000);
  }

copyIcon.addEventListener("click", () => {
  if (password) {
    checkCopy();
  }
});
