//get items(form and input IDs) from the DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

//Show input error message
function showError(input, message){
  //grab form-control, a parent element of input
  const formControl = input.parentElement;

  //Add error css class to form-control
  //className overwrites the current css class. In this instance, form-control class must remain.
  formControl.className = 'form-control error';

  //show text error message
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid.');
  }
}

// function checkPassword(input) {
//   const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
//   return re.test(String(input).toLowerCase());
// }

function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(confirm, 'Passwords must match.');
  } 
}

function checkRequiredFields(inputArr) {
  inputArr.forEach((input) => {
    //input = input.charAt(0).toUpperCase();
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be at less than ${max} characters.`);
  }else {
    showSuccess(input);
  }
}


function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//e is an event parameter that includes several properties and methods that can be used

//Event listener for submit button
form.addEventListener('submit', function(e) {
  //prevent the form from submitting
  e.preventDefault();

  //console.log("test");
  
  checkRequiredFields([username, email, password, confirm]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  //checkPassword(password, confirm);
  checkPasswordsMatch(password, confirm);
});