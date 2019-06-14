'use strict';
var COUNT_ARRAY = 8;
var OFFER_TYPES = ['place', 'flat', 'house', 'bungalo'];
var MIN_MAP_Y = 130;
var MAX_MAP_Y = 630;
var adsArray = [];
var mapBlock = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin--main');
var mapWidth = mapBlock.offsetWidth;
var pinWidth = mapPin.offsetWidth;

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

mapBlock.classList.remove('map--faded');
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
for (var j = 0; j < adsArray.length; j++) {
  fragment.appendChild(renderAds(adsArray[j]));
}

pinblock.appendChild(fragment);
