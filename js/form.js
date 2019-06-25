'use strict';
(function () {
  var elementsMapFilters = window.mapFilters.querySelectorAll('input, select, fieldset');
  var adFormPrice = window.adForm.querySelector('#price');
  var adFormAddress = window.adForm.querySelector('#address');
  // Статус формы объявления
  window.statusAdForm = function (elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isActive;
    }
  };
  // Статус Фильтров карты
  window.statusMapFilters = function (elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isActive;
    }
  };
  // Изменение значения поля адресса
  window.setAddress = function (coordinate) {
    adFormAddress.value = coordinate.x + ', ' + coordinate.y;
  };
  // Выбор типа жилья и выведение минимальной стоимости за ночь
  window.offerTypeSelectHandler = function (evt) {
    var minPriceOfNight;
    var valueType = evt.target.value;
    minPriceOfNight = window.OFFER_TYPES[valueType];
    adFormPrice.min = minPriceOfNight;
    adFormPrice.placeholder = minPriceOfNight;
  };
  // Прослушка выбора времени заезда с изменением времени выезда
  window.offerCheckInHandler = function (evt) {
    window.adFormTimeOut.value = evt.target.value;
  };
  // Прослушка выбора времени выезда с изменением времени заезда
  window.offerCheckOutHandler = function (evt) {
    window.adFormTimeIn.value = evt.target.value;
  };
  // Деактивация приложеия
  window.disabledApp = function () {
    window.mapBlock.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    window.statusAdForm(window.elementsAdForm, true);
    window.statusMapFilters(elementsMapFilters, true);
  };
})();
