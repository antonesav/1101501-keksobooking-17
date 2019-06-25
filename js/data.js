'use strict';
(function () {
  window.OFFER_TYPES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  window.adsArray = [];
  window.MIN_MAP_Y = 130;
  window.MAX_MAP_Y = 630;
  window.mapBlock = document.querySelector('.map');
  window.mapPin = document.querySelector('.map__pin--main');
  window.mapWidth = window.mapBlock.offsetWidth;
  window.pinWidth = window.mapPin.offsetWidth;
  window.pinHeight = window.mapPin.offsetHeight + 22;
  window.adForm = document.querySelector('.ad-form');
  window.mapFilters = document.querySelector('.map__filters');
  window.elementsMapFilters = window.mapFilters.querySelectorAll('input, select, fieldset');
  window.elementsAdForm = window.adForm.querySelectorAll('fieldset');
  window.adFormTimeIn = window.adForm.querySelector('#timein');
  window.adFormTimeOut = window.adForm.querySelector('#timeout');
})();
