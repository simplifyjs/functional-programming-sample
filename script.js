/* Form Element */
let bookingForm = document.getElementById('bookingForm');

/* Provide addEventListener fallback for older browsers */
function formHandler(element, event, callback) {
  if('addEventListener' in window || Element.prototype.addEventListener) {
    element.addEventListener(event, callback);
  } else if ('attachEvent') {
    element.attachEvent('on'+ event, callback);
  } else {
    element['on' + event] = callback;
  }
}

/* Execute Form Submission Handler */
formHandler(bookingForm, 'submit', e => {
  e.preventDefault(); // Prevent page loading upon submission
  _resetErrDiv(); 
  validate(getAllInput(bookingForm, '.form-control')); // Form input validation
});

/* Get all input element */
function getAllInput(form, selector) {
  return form.querySelectorAll(selector);
}

/* Get each input value */
function getInputVal(id){
  return document.getElementById(id).value;
}

/* Execute to reset error div after succeeding submission */
function _resetErrDiv() {
  document.querySelectorAll('.invalid-feedback').forEach(el => {
    el.style.display = 'none';
  })
}

/* Display error message for affected input field */
function _getErrDiv(name) {
  document.getElementById('err' + name).style.display = 'block';
}

/* Form Validation */
function validate(formEl) {
  let formErrField = [],
   formValObj = {},
   isError = false;

  /* Check if there is a value for required fields */
  formEl.forEach(el => {
    if(el.getAttribute('required') == 'required' && !el.value) {
      formErrField.push(el.name);
      isError = true;
    } else {
      formValObj[el.getAttribute('id')] = getInputVal(el.getAttribute('id'));
    }
  });

  /* Pass fields with errors */
  if(isError) {
    outputError(formErrField);
    return;
  }
  /* Output passed values */
  outputVal(formValObj);
}

/* Checks through each fields with error */
function outputError(formErrField) {
  formErrField.forEach(name => {
  _getErrDiv(name);
  })
}

/* Output to DOM passed values */
function outputVal(data) {
  let resultEl = document.getElementById('result'),
    tr = document.createElement('tr');
    
  Object.values(data).forEach(val => { 
    var td = document.createElement('td');
    var cellText = document.createTextNode(val);
    td.appendChild(cellText);
    tr.appendChild(td);
  })

  resultEl.appendChild(tr);
}