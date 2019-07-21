'use strict';
(function () {
  window.data = {
    OFFER_TYPES: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    RED_COLOR: 'rgba(255, 86, 53, 0.6)',
    GREEN_COLOR: 'rgba(76, 242, 65, 0.6)',
    ads: [],
    MIN_MAP_Y: 130,
    MAX_MAP_Y: 630,
    ESC_KEYCODE: 27,
    XHR_TIMEOUT: 10000,
    MAIN_PIN_START_COORDS: {},
    mapBlock: document.querySelector('.map'),
    pinBlock: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main'),
    renderRibbon: function (message, color) {
      var ribbon = document.createElement('div');
      ribbon.innerHTML = '<span style="font-size: 20px; line-height: 50px; font-family: inherit; color: #fff; font-weight: bold;">' + message + '</span>';
      ribbon.style.position = 'fixed';
      ribbon.style.left = '0';
      ribbon.style.right = '0';
      ribbon.style.width = '100%';
      ribbon.style.height = '50px';
      ribbon.style.backgroundColor = color;
      ribbon.style.textAlign = 'center';
      ribbon.style.zIndex = '100';
      document.body.insertAdjacentElement('afterbegin', ribbon);
      setTimeout(function () {
        document.body.removeChild(ribbon);
      }, 3000);
    }
  };
})();
