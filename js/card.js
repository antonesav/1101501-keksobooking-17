'use strict';
(function () {
  var COUNT_ARRAY = 8;
  var adsArray = [];
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
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
      offer: getOfferType(window.globalUtils.OFFER_TYPES),
      location: getCoordinatePinXY(mapWidth, pinWidth, window.MIN_MAP_Y, window.MAX_MAP_Y)
    });
  }
  var pinBlock = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  // Заполнение указателей
  window.cardUtils = {
    renderAds: function (ad) {
      var pinElem = pinTemplate.cloneNode(true);
      pinElem.style.left = ad.location.x + 'px';
      pinElem.style.top = ad.location.y + 'px';
      pinElem.querySelector('img').src = ad.author.avatar;
      pinElem.querySelector('img').alt = 'заголовок объявления';
      return pinElem;
    },
    renderFragmentAds: function () {
      for (var j = 0; j < adsArray.length; j++) {
        fragment.appendChild(window.cardUtils.renderAds(adsArray[j]));
      }
      pinBlock.appendChild(fragment);
    }
  };
})();
