'use strict';
(function () {
  var elementsMapFilters = document.querySelectorAll('.map__filters input, select, fieldset');
  var mapPin = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
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
  var fragment = document.createDocumentFragment();
  var errTemplateUpload = document.querySelector('#error').content.querySelector('.error');
  var successTemplateUpload = document.querySelector('#success').content.querySelector('.success');
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
      if ((roomValue !== '100' && capacity.value === '0') || (roomValue === '100' && capacity.value !== '0')) {
        this.addInvalidity(ValidMessages.ERROR_MESSAGE0);
      } else if (capacity.value > roomValue) {
        this.addInvalidity(ValidMessages['ERROR_MESSAGE' + roomValue] || ValidMessages.ERROR_LIMIT);
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
    minPriceOfNight = window.globalUtils.OFFER_TYPES[valueType];
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
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      statusAdForm(elementsAdForm, false);
      statusMapFilters(elementsMapFilters, false);
      adFormType.addEventListener('change', offerTypeSelectHandler);
      adFormTimeIn.addEventListener('change', offerCheckInHandler);
      adFormTimeOut.addEventListener('change', offerCheckOutHandler);
    },
    disabled: function () {
      mapBlock.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      statusAdForm(elementsAdForm, true);
      statusMapFilters(elementsMapFilters, true);
    },
    setAddress: function (coordinate) {
      adFormAddress.value = coordinate.x + ', ' + coordinate.y;
    }
  };

  function resetApp(mainPin, overlay) {
    var card = mapBlock.querySelector('.map__card');
    mapBlock.removeChild(card);

    window.formUtils.disabled();

    adForm.reset();

    mainPin.style.left = window.globalUtils.MAIN_PIN_START_COORDS.x;
    mainPin.style.top = window.globalUtils.MAIN_PIN_START_COORDS.y;

    Array.from(window.globalUtils.pinBlock.children).forEach(function (pinNode) {
      if (pinNode !== mainPin && pinNode !== overlay) {
        window.globalUtils.pinBlock.removeChild(pinNode);
      }
    });
  }

  function renderMessage(template) {
    var clonePopup = template.cloneNode(true);
    var popup = fragment.appendChild(clonePopup);
    var closePopupButton = popup.querySelector('.error__button');
    mainBlock.appendChild(popup);

    function closeEscPopupHandler(evt) {
      if (evt.keyCode === window.globalUtils.ESC_KEYCODE) {
        mainBlock.removeChild(popup);
        document.removeEventListener('keydown', closeEscPopupHandler);
        document.removeEventListener('click', anyClickPopupHandler);
      }
    }

    function anyClickPopupHandler() {
      if (template === successTemplateUpload) {
        resetApp(mapPin, mainOverlay);
      }
      mainBlock.removeChild(popup);
      document.removeEventListener('click', anyClickPopupHandler);
      document.removeEventListener('keydown', closeEscPopupHandler);
    }

    if (closePopupButton) {
      closePopupButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        mainBlock.removeChild(popup);
        document.removeEventListener('click', anyClickPopupHandler);
        document.removeEventListener('keydown', closeEscPopupHandler);
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
