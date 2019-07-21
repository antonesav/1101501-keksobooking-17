'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var elementsMapFilters = document.querySelectorAll('.map__filters input, select, fieldset');
  var adForm = document.querySelector('.ad-form');
  var elementsAdForm = document.querySelectorAll('.ad-form fieldset');
  var adFormType = document.querySelector('#type');
  var adFormPrice = document.querySelector('#price');
  var adFormAddress = document.querySelector('#address');
  var adFormTimeIn = document.querySelector('#timein');
  var adFormTimeOut = document.querySelector('#timeout');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormRoomNumbers = adForm.querySelector('#room_number');
  var mainBlock = document.querySelector('main');
  var mainOverlay = document.querySelector('.map__overlay');
  var formResetButton = document.querySelector('.ad-form__reset');
  var errTemplateUpload = document.querySelector('#error').content.querySelector('.error');
  var successTemplateUpload = document.querySelector('#success').content.querySelector('.success');
  var PALACE_VALUE = '100';
  var PALACE_GUEST_VALUE = '0';
  var ValidMessages = {
    ERROR_MESSAGE0: 'Количество мест "не для гостей" соответствует количеству комнат в "100"',
    ERROR_MESSAGE1: 'В 1 комнате размещается только 1 гость',
    ERROR_MESSAGE2: 'В 2 комнатах размещается не более двух гостей',
    ERROR_LIMIT: 'Количество гостей больше количества комнат'
  };

  var CustomValidity = function () { };
  CustomValidity.prototype = {
    invalidity: [],
    checkValidityCapacity: function (capacity, rooms) {
      var roomValue = rooms.value;
      if ((roomValue !== PALACE_VALUE && capacity.value === PALACE_GUEST_VALUE) ||
        (roomValue === PALACE_VALUE && capacity.value !== PALACE_GUEST_VALUE)) {
        this.addInvalidity(ValidMessages.ERROR_MESSAGE0);
      } else if (capacity.value > roomValue) {
        this.addInvalidity(ValidMessages['ERROR_MESSAGE' + roomValue]);
      } else if (roomValue > capacity.value) {
        this.addInvalidity(ValidMessages.ERROR_LIMIT);
      }
    },
    addInvalidity: function (message) {
      this.invalidity.push(message);
    },
    getInvalidity: function () {
      return this.invalidity.join('. \n');
    }
  };

  var capacityHandler = function () {
    var customValidation = new CustomValidity();
    customValidation.invalidity = [];
    adFormCapacity.setCustomValidity('');
    customValidation.checkValidityCapacity(adFormCapacity, adFormRoomNumbers);
    var customValidityMessage = customValidation.getInvalidity();
    if (customValidityMessage) {
      adFormCapacity.setCustomValidity(customValidityMessage);
    }
  };

  adFormCapacity.addEventListener('change', capacityHandler);
  adFormRoomNumbers.addEventListener('change', capacityHandler);

  // Статус формы объявления
  var statusAdForm = function (elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isActive;
    }
  };
  // Статус Фильтров карты
  var statusMapFilters = function (elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isActive;
    }
  };
  // Выбор типа жилья и выведение минимальной стоимости за ночь
  var offerTypeSelectHandler = function (evt) {
    var minPriceOfNight;
    var valueType = evt.target.value;
    minPriceOfNight = window.data.OFFER_TYPES[valueType];
    adFormPrice.min = minPriceOfNight;
    adFormPrice.placeholder = minPriceOfNight;
  };
  // Прослушка выбора времени заезда с изменением времени выезда
  var offerCheckInHandler = function (evt) {
    adFormTimeOut.value = evt.target.value;
  };
  // Прослушка выбора времени выезда с изменением времени заезда
  var offerCheckOutHandler = function (evt) {
    adFormTimeIn.value = evt.target.value;
  };
  // Приложение : активация, деактивация
  window.formUtils = {
    activate: function () {
      window.data.mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      statusAdForm(elementsAdForm, false);
      adFormType.addEventListener('change', offerTypeSelectHandler);
      adFormTimeIn.addEventListener('change', offerCheckInHandler);
      adFormTimeOut.addEventListener('change', offerCheckOutHandler);
    },
    activatedMapFilters: function () {
      statusMapFilters(elementsMapFilters, false);
    },
    disabled: function () {
      window.data.mapBlock.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      statusAdForm(elementsAdForm, true);
      statusMapFilters(elementsMapFilters, true);
    },
    setAddress: function (coordinate) {
      adFormAddress.value = coordinate.x + ', ' + coordinate.y;
    }
  };

  formResetButton.addEventListener('click', resetApp);

  function resetApp() {
    window.cardUtils.removeCard();

    window.formUtils.disabled();

    adForm.reset();

    window.loadUtils.clearFormPhoto();

    window.data.mainPin.style.left = window.data.MAIN_PIN_START_COORDS.x;
    window.data.mainPin.style.top = window.data.MAIN_PIN_START_COORDS.y;

    Array.from(window.data.pinBlock.children).forEach(function (pinNode) {
      if (pinNode !== window.data.mainPin && pinNode !== mainOverlay) {
        window.data.pinBlock.removeChild(pinNode);
      }
    });
  }

  function renderMessage(template) {
    var clonePopup = template.cloneNode(true);
    var popup = fragment.appendChild(clonePopup);
    var closePopupButton = popup.querySelector('.error__button');
    mainBlock.appendChild(popup);

    function removePopupAndHandler() {
      mainBlock.removeChild(popup);
      document.removeEventListener('keydown', closeEscPopupHandler);
      document.removeEventListener('click', anyClickPopupHandler);
    }

    function closeEscPopupHandler(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        if (template === successTemplateUpload) {
          resetApp(window.data.mainPin, mainOverlay);
        }
        removePopupAndHandler();
      }
    }

    function anyClickPopupHandler() {
      if (template === successTemplateUpload) {
        resetApp(window.data.mainPin, mainOverlay);
      }
      removePopupAndHandler();
    }

    if (closePopupButton) {
      closePopupButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        removePopupAndHandler();
      });
    }

    document.addEventListener('keydown', closeEscPopupHandler);
    document.addEventListener('click', anyClickPopupHandler);
  }

  function successPost() {
    renderMessage(successTemplateUpload);
  }

  function errorPost() {
    renderMessage(errTemplateUpload);
  }

  adForm.addEventListener('submit', function (evt) {
    window.uploadUtils.upload(new FormData(adForm), successPost, errorPost);
    evt.preventDefault();
  });
})();
