// import { options } from './index.js';

export class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this.formElement = formElement;
  }
  _showInputError(input) {
    const error = this.formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._options.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._options.errorClass);
  }
  _hideInputError(input) {
    const error = this.formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._options.inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._options.errorClass);
  }
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, this._options.validationMessage, this._options);
    } else {
      this._hideInputError(input);
    }
  }
  _setEventListeners() {
    const inputElements = Array.from(this.formElement.querySelectorAll(this._options.inputSelector));
    const submitButton = this.formElement.querySelector(this._options.submitButtonSelector);
    this._toggleButton(inputElements, submitButton, this._options.inactiveButtonClass);
    inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton(inputElements, submitButton, this._options.inactiveButtonClass);
      });
    });
  }
  _hasInvalidInput() {
    const inputElements = Array.from(this.formElement.querySelectorAll(this._options.inputSelector));
    return inputElements.some((input) => {
      return !input.validity.valid;
    });
  }
  _toggleButton(inputElements) {
    const submitButton = this.formElement.querySelector(this._options.submitButtonSelector);
    if (this._hasInvalidInput(inputElements)) {
      submitButton.classList.add(this._options.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._options.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  enableValidation() {
    const formElements = Array.from(document.querySelectorAll(this._options.formSelector));
    formElements.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement, this._options);
    });
  }
  resetPopupValid(popup) {
    const form = popup.querySelector(this._options.formSelector);
    const submitButton = form.querySelector(this._options.submitButtonSelector);
    const inputElements = Array.from(form.querySelectorAll(this._options.inputSelector));
    this._toggleButton(inputElements, submitButton);
    inputElements.forEach((input) => {
      this._hideInputError(input, this._options);
    });
  }
}