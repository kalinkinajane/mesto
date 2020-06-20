
const showInputError = (formElement, input, errorMessage, options) => {
  const error = formElement.querySelector(`#${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(options.errorClass);
};
const hideInputError = (formElement, input, options) => {
  const error = formElement.querySelector(`#${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  error.textContent = '';
  error.classList.remove(options.errorClass);

};
const checkInputValidity = (formElement, input, options) => {
  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage, options);
  } else {
    hideInputError(formElement, input, options);
  }
};

const setEventListeners = (formElement, options) => {
  const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  toggleButton(inputElements, submitButton, options.inactiveButtonClass);
  inputElements.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(formElement, input, options);
      toggleButton(inputElements, submitButton, options.inactiveButtonClass);
    });
  });
};
function hasInvalidInput(inputElements) {
  return inputElements.some((input) => {
    return !input.validity.valid;
  });
};
function toggleButton(inputElements, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled', true);
  }
};
const enableValidation = (options) => {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));

  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      formElement.reset();
    });
    setEventListeners(formElement, options);
  });
};

const resetPopupValid = (popup, options) => {
  const form = popup.querySelector(options.formSelector);
  const submitButton = form.querySelector(options.submitButtonSelector);
  const inputElements = Array.from(form.querySelectorAll(options.inputSelector));
  toggleButton(inputElements, submitButton);
  inputElements.forEach((input) => {
    hideInputError(form, input, options);
  });
};
const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};