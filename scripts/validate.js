function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach(formElement => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
    inputElements.forEach(input => {
      input.addEventListener('input', e => handleInput(e, options.inputErrorClass, options.errorClass))
    })
    const submitButton = formElement.querySelector(options.submitButtonSelector);
    formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    formElement.addEventListener('input', () => toggleButton(formElement, submitButton, options.inactiveButtonClass))
  })
}

function toggleButton(formElement, submitButton, inactiveButtonClass) {
  const isFormValid = formElement.checkValidity();
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(inactiveButtonClass,
    !isFormValid);
}
function handleInput(evt, errCls, err) {
  const input = evt.target;
  const error = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    input.classList.remove(errCls);
    error.classList.remove(err);
    error.textContent = '';
  } else {
    input.classList.add(errCls);
    error.classList.add(err);
    error.textContent = input.validationMessage;
  }
}

const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
enableValidation(obj)