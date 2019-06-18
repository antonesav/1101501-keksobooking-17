'use strict';
var COUNT_ARRAY = 8;
var OFFER_TYPES = ['place', 'flat', 'house', 'bungalo'];
var MIN_MAP_Y = 130;
var MAX_MAP_Y = 630;
var adsArray = [];
var mapBlock = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var elementsMapFilters = mapFilters.querySelectorAll('input, select, fieldset');
var adForm = document.querySelector('.ad-form');
var elementsAdForm = adForm.querySelectorAll('fieldset');
var mapPin = document.querySelector('.map__pin--main');
var mapWidth = mapBlock.offsetWidth;
var pinWidth = mapPin.offsetWidth;
var pinHeight = mapPin.offsetHeight + 22;

// Статус формы объявления
function statusAdForm(element, isActive) {
  for (var i = 0; i < element.length; i++) {
    if (isActive) {
      element[i].removeAttribute('disabled');
    } else {
      element[i].setAttribute('disabled', '');
    }
  }
}
// Статус Фильтров карты
function statusMapFilters(element, isActive) {
  for (var i = 0; i < element.length; i++) {
    if (isActive) {
      element[i].removeAttribute('disabled');
    } else {
      element[i].setAttribute('disabled', '');
    }
  }
}

// Деактивация приложеия
function disabledApp() {
  mapBlock.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  statusAdForm(elementsAdForm, false);
  statusMapFilters(elementsMapFilters, false);
}

// Активация приложения
function activatedApp() {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  statusAdForm(elementsAdForm, true);
  statusMapFilters(elementsMapFilters, true);
}

// Генерация рандомного числа для от min до max включительно
function getRandomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

// Генерация адреса изображения
function getImagePath(number) {
  var imageNumber = number < 10 ? '0' + number : number;
  return {avatar: 'img/avatars/user' + imageNumber + '.png'};
}

// Генерация типа offer
function getOfferType(typeOfferArr, randomNumber) {
  return {type: typeOfferArr[randomNumber]};
}

// Генерация координат X, Y
function getCoordinatePinXY(widthMap, widthPin, minY, maxY) {
  return {x: getRandomNumber(widthPin, widthMap - widthPin), y: getRandomNumber(minY, maxY)};
}

// Заполнение массива похожих объявлений
for (var i = 0; i < COUNT_ARRAY; i++) {
  adsArray.push({
    author: getImagePath(i + 1),
    offer: getOfferType(OFFER_TYPES, getRandomNumber(0, OFFER_TYPES.length - 1)),
    location: getCoordinatePinXY(mapWidth, pinWidth, MIN_MAP_Y, MAX_MAP_Y)
  });
}

var pinblock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

// Заполнение указателей
function renderAds(ad) {
  var pinElem = pinTemplate.cloneNode(true);
  pinElem.style.left = '' + ad.location.x + 'px';
  pinElem.style.top = '' + ad.location.y + 'px';
  pinElem.querySelector('img').src = '' + ad.author.avatar + '';
  pinElem.querySelector('img').alt = 'заголовок объявления';
  return pinElem;
}

// Добавление элементов в фрагмент
function renderFragmentAds() {
  for (var j = 0; j < adsArray.length; j++) {
    fragment.appendChild(renderAds(adsArray[j]));
  }
  pinblock.appendChild(fragment);
}

// Вычисление координат пина
function getMainPinCoordinate(pin, widthPin, heightPin) {
  var coordinateX = Math.round(pin.offsetLeft + (widthPin / 2));
  var coordinateY = Math.round(pin.offsetTop + heightPin);
  return {x: coordinateX, y: coordinateY};
}

// Изменение значения поля адресса
function setAddress(coordinate) {
  var addressInput = document.querySelector('#address');
  addressInput.value = coordinate.x + ', ' + coordinate.y;
}

// Обработчик клика на пин main
var mapPinMainClickHandler = function () {
  activatedApp();
  setAddress(getMainPinCoordinate(mapPin, pinWidth, pinHeight));
  renderFragmentAds();
};

// Инициализация
function initApp() {
  disabledApp();
  mapPin.addEventListener('mouseup', mapPinMainClickHandler);
}

initApp();
