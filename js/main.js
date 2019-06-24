'use strict';
var COUNT_ARRAY = 8;
var OFFER_TYPES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
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
var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');
var adFormAddress = adForm.querySelector('#address');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');

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
function getOfferType(typeOfferArr) {
  var typeObject = Object.keys(typeOfferArr);
  var typeIndex = getRandomNumber(0, typeObject.length - 1);
  return {type: typeObject[typeIndex]};
}

// Генерация координат X, Y
function getCoordinatePinXY(widthMap, widthPin, minY, maxY) {
  return {x: getRandomNumber(widthPin, widthMap - widthPin), y: getRandomNumber(minY, maxY)};
}

// Заполнение массива похожих объявлений
for (var i = 0; i < COUNT_ARRAY; i++) {
  adsArray.push({
    author: getImagePath(i + 1),
    offer: getOfferType(OFFER_TYPES),
    location: getCoordinatePinXY(mapWidth, pinWidth, MIN_MAP_Y, MAX_MAP_Y)
  });
}

var pinBlock = document.querySelector('.map__pins');
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
  pinBlock.appendChild(fragment);
}

// Вычисление координат пина
function getMainPinCoordinate(pin, widthPin, heightPin) {
  var coordinateX = Math.round(pin.offsetLeft + (widthPin / 2));
  var coordinateY = Math.round(pin.offsetTop + heightPin);
  return {x: coordinateX, y: coordinateY};
}

// Изменение значения поля адресса
function setAddress(coordinate) {
  adFormAddress.value = coordinate.x + ', ' + coordinate.y;
}

// Выбор типа жилья и выведение минимальной стоимости за ночь
function offerTypeSelectHandler(evt) {
  var minPriceOfNight;
  var valueType = evt.target.value;
  minPriceOfNight = OFFER_TYPES[valueType];
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
  mapBlock.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  statusAdForm(elementsAdForm, true);
  statusMapFilters(elementsMapFilters, true);
}

// Активация приложения
function activatedApp() {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  statusAdForm(elementsAdForm, false);
  statusMapFilters(elementsMapFilters, false);
  adFormType.addEventListener('change', offerTypeSelectHandler);
  adFormTimeIn.addEventListener('change', offerChangeTimeInHandler);
  adFormTimeOut.addEventListener('change', offerChangeTimeOutHandler);
}

// Слушатель нажатия на пин
function mouseDownHandler(evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  // Перетаскивание пина
  function mouseMoveHandler(evtMove) {
    evtMove.preventDefault();
    var shift = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY
    };
    startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };
    var currentX = mapPin.offsetLeft - shift.x;
    var currentY = mapPin.offsetTop - shift.y;
    if (mapWidth - pinWidth > currentX && currentX > 0) {
      mapPin.style.left = currentX + 'px';
    }
    if (MAX_MAP_Y > currentY && currentY > MIN_MAP_Y) {
      mapPin.style.top = currentY + 'px';
    }
  }
  // Слушаем mouseUp, отменяем события перетаскивания, активируем страницу
  function mouseUpHandler(evtUp) {
    evtUp.preventDefault();
    activatedApp();
    renderFragmentAds();
    setAddress(getMainPinCoordinate(mapPin, pinWidth, pinHeight));
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
}

// Инициализация
function initApp() {
  disabledApp();
  mapPin.addEventListener('mousedown', mouseDownHandler);
}

initApp();
