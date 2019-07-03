'use strict';
(function () {
  var elementsMapFilters = document.querySelectorAll('.map__filters input, select, fieldset');
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var elementsAdForm = document.querySelectorAll('.ad-form fieldset');
  var adFormType = document.querySelector('#type');
  var adFormPrice = document.querySelector('#price');
  var adFormAddress = document.querySelector('#address');
  var adFormTimeIn = document.querySelector('#timein');
  var adFormTimeOut = document.querySelector('#timeout');
  var mainBlock = document.querySelector('main');
  var fragment = document.createDocumentFragment();
  var errTemplateUpload = document.querySelector('#error').content.querySelector('.error');
  var successTemplateUpload = document.querySelector('#success').content.querySelector('.success');
  // Фильтры
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  housingType.addEventListener('select', function (evt) {
    var type = housingType.value;
  });

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
