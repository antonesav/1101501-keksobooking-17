'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Заполнение указателей
  window.renderAds = function (ad) {
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.style.left = '' + ad.location.x + 'px';
    pinElem.style.top = '' + ad.location.y + 'px';
    pinElem.querySelector('img').src = '' + ad.author.avatar + '';
    pinElem.querySelector('img').alt = 'заголовок объявления';
    return pinElem;
  };

  // Вычисление координат пина
  window.getMainPinCoordinate = function (pin, widthPin, heightPin) {
    var coordinateX = Math.round(pin.offsetLeft + (widthPin / 2));
    var coordinateY = Math.round(pin.offsetTop + heightPin);
    return {x: coordinateX, y: coordinateY};
  };
  // Слушатель нажатия на пин
  window.mouseDownHandler = function (evt) {
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
      var currentX = window.mapPin.offsetLeft - shift.x;
      var currentY = window.mapPin.offsetTop - shift.y;
      if (window.mapWidth - window.pinWidth > currentX && currentX > 0) {
        window.mapPin.style.left = currentX + 'px';
      }
      if (window.MAX_MAP_Y > currentY && currentY > window.MIN_MAP_Y) {
        window.mapPin.style.top = currentY + 'px';
      }
    }
    // Слушаем mouseUp, отменяем события перетаскивания, активируем страницу
    function mouseUpHandler(evtUp) {
      evtUp.preventDefault();
      window.activatedApp();
      window.renderFragmentAds();
      window.setAddress(window.getMainPinCoordinate(window.mapPin, window.pinWidth, window.pinHeight));
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  window.initApp();
})();
