'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapWidth = window.data.mapBlock.offsetWidth;
  var pinWidth = window.data.mainPin.offsetWidth;
  var PIN_AFTER_ELEMENT_HEIGHT = 22;
  var pinHeight = window.data.mainPin.offsetHeight + PIN_AFTER_ELEMENT_HEIGHT;
  window.data.MAIN_PIN_START_COORDS = {
    x: window.data.mainPin.style.left,
    y: window.data.mainPin.style.top
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
      var currentX = window.data.mainPin.offsetLeft - shift.x;
      var currentY = window.data.mainPin.offsetTop - shift.y;
      if (mapWidth - pinWidth > currentX && currentX > 0) {
        window.data.mainPin.style.left = currentX + 'px';
      }
      if (window.data.MAX_MAP_Y - pinHeight > currentY && currentY > window.data.MIN_MAP_Y) {
        window.data.mainPin.style.top = currentY + 'px';
      }
    }

    // Слушаем mouseUp, отменяем события перетаскивания, активируем страницу
    function mouseUpHandler(evtUp) {
      evtUp.preventDefault();

      if (window.data.mapBlock.classList.contains('map--faded')) {
        window.cardUtils.renderFragmentAds();
      }

      window.formUtils.activate();
      window.formUtils.setAddress(getMainPinCoordinate(window.data.mainPin, pinWidth, pinHeight));
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  function initApp() {
    window.formUtils.disabled();
    window.data.mainPin.addEventListener('mousedown', onPinMouseDownHandler);
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
