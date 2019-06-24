'use strict';
(function () {
  var COUNT_ARRAY = 8;
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
    window.adsArray.push({
      author: getImagePath(i + 1),
      offer: getOfferType(window.OFFER_TYPES),
      location: getCoordinatePinXY(window.mapWidth, window.pinWidth, window.MIN_MAP_Y, window.MAX_MAP_Y)
    });
  }
  var pinBlock = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  // Добавление элементов в фрагмент
  window.renderFragmentAds = function () {
    for (var j = 0; j < window.adsArray.length; j++) {
      fragment.appendChild(window.renderAds(window.adsArray[j]));
    }
    pinBlock.appendChild(fragment);
  };
})();
