'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var elementsMapFilters = mapFilters.querySelectorAll('input, select, fieldset');
  var elementsAdForm = window.adForm.querySelectorAll('fieldset');
  var adFormPrice = window.adForm.querySelector('#price');
  var adFormType = window.adForm.querySelector('#type');
  var adFormAddress = window.adForm.querySelector('#address');
  var adFormTimeIn = window.adForm.querySelector('#timein');
  var adFormTimeOut = window.adForm.querySelector('#timeout');
  // Статус формы объявления
  function statusAdForm(elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isActive;
    }
  }
  // Статус Фильтров карты
  function statusMapFilters(elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isActive;
    }
  }
  // Изменение значения поля адресса
  window.setAddress = function (coordinate) {
    adFormAddress.value = coordinate.x + ', ' + coordinate.y;
  };
  // Выбор типа жилья и выведение минимальной стоимости за ночь
  function offerTypeSelectHandler(evt) {
    var minPriceOfNight;
    var valueType = evt.target.value;
    minPriceOfNight = window.OFFER_TYPES[valueType];
    adFormPrice.min = minPriceOfNight;
    adFormPrice.placeholder = minPriceOfNight;
  }
  // Прослушка выбора времени заезда с изменением времени выезда
  function offerChangeTimeInHandler() {
    var optionsTimeOut = adFormTimeOut.querySelectorAll('option');
    var timeInSelectIndex = adFormTimeIn.selectedIndex;
    optionsTimeOut[timeInSelectIndex].selected = true;
  }
  // Прослушка выбора времени выезда с изменением времени заезда
  function offerChangeTimeOutHandler() {
    var optionsTimeIn = adFormTimeIn.querySelectorAll('option');
    var timeOutSelectIndex = adFormTimeOut.selectedIndex;
    optionsTimeIn[timeOutSelectIndex].selected = true;
  }
  // Деактивация приложеия
  function disabledApp() {
    window.mapBlock.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    statusAdForm(elementsAdForm, true);
    statusMapFilters(elementsMapFilters, true);
  }
  // Активация приложения
  window.activatedApp = function () {
    window.mapBlock.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');
    statusAdForm(elementsAdForm, false);
    statusMapFilters(elementsMapFilters, false);
    adFormType.addEventListener('change', offerTypeSelectHandler);
    adFormTimeIn.addEventListener('change', offerChangeTimeInHandler);
    adFormTimeOut.addEventListener('change', offerChangeTimeOutHandler);
  };
  // Инициализация
  window.initApp = function () {
    disabledApp();
    window.mapPin.addEventListener('mousedown', window.mouseDownHandler);
  };
})();
