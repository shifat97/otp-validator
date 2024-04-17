let generatedOTP;
let intervalID;
let timeoutID;

const otpExpireElement = document.getElementById('otp-expire-id');

function expireOTP() {
  let time = 15;
  intervalID = setInterval(function () {
    otpExpireElement.textContent = `OTP will expire in ${time = time - 1} seconds`;
  }, 1000);

  timeoutID = setTimeout(function () {
    otpExpireElement.textContent = "OTP Expired";
    clearInterval(intervalID);
    generateOTP();
  }, 15000)

}

function tackleOTPBoxes() {
  const boxes = document.getElementById("otp-box-list-id");
  boxes.addEventListener("input", function (event) {
    const target = event.target;
    const value = target.value;

    if (isNaN(value)) {
      target.value = "";
      return;
    }

    const nextElement = target.nextElementSibling;

    if (nextElement) {
      nextElement.focus();
    }

    validateOTP();
  })
}

function generateOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000); // generate 4 digit random number
  const otpElement = document.getElementById('generate-otp-id');
  otpElement.textContent = `Your OTP: ${generatedOTP}`;

  expireOTP();
}

function validateOTP() {
  let typedNumber = "";

  const boxListElement = document.getElementById("otp-box-list-id");
  const children = [...boxListElement.children]; // copy of input elements
  children.forEach(element => {
    typedNumber += element.value;
  })

  const result = generatedOTP === parseInt(typedNumber);
  const resultElement = document.getElementById('otp-valid-check-id');
  if (result) {
    resultElement.textContent = "OTP has been validated successfully";
    resultElement.classList.remove("invalid");
    resultElement.classList.add("success");
    clearInterval(intervalID);
    clearTimeout(timeoutID);
  } else {
    resultElement.textContent = "OTP is invalid";
    resultElement.classList.remove("success")
    resultElement.classList.add("invalid");
  }
}

tackleOTPBoxes();
generateOTP();