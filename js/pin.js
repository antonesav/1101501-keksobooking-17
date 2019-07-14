'use strict';
(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapWidth = mapBlock.offsetWidth;
  var pinWidth = mapPin.offsetWidth;
  var PIN_AFTER_HEIGHT = 22;
  var pinHeight = mapPin.offsetHeight + PIN_AFTER_HEIGHT;
  window.globalUtils.MAIN_PIN_START_COORDS = {
    x: mapPin.style.left,
    y: mapPin.style.top
  };

  // Вычисление координат пина
  function getMainPinCoordinate(pin, widthPin, heightPin) {
    var coordinateX = Math.round(pin.offsetLeft + (widthPin / 2));
    var coordinateY = Math.round(pin.offsetTop + heightPin);
    return {x: coordinateX, y: coordinateY};
  }
  // Слушатель нажатия на пин
  var onPinMouseDownHandler = function (evt) {
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
      if (window.globalUtils.MAX_MAP_Y > currentY && currentY > window.globalUtils.MIN_MAP_Y) {
        mapPin.style.top = currentY + 'px';
      }
    }

    // Слушаем mouseUp, отменяем события перетаскивания, активируем страницу
    function mouseUpHandler(evtUp) {
      evtUp.preventDefault();
      window.formUtils.activate();
      window.cardUtils.renderFragmentAds();
      window.formUtils.setAddress(getMainPinCoordinate(mapPin, pinWidth, pinHeight));
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  function initApp() {
    window.formUtils.disabled();
    mapPin.addEventListener('mousedown', onPinMouseDownHandler);
  }
  initApp();

  window.pinUtils = {
    fillPins: function (ad) {
      var pinElem = pinTemplate.cloneNode(true);
      var pinImageElem = pinElem.querySelector('img');
      pinElem.style.left = ad.location.x + 'px';
      pinElem.style.top = ad.location.y + 'px';
      pinImageElem.src = ad.author.avatar;
      pinImageElem.alt = ad.offer.title;
      pinElem.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.cardUtils.renderCard(ad);
      });
      return pinElem;
    }
  };
})();
