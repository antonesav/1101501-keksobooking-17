'use strict';
(function () {
  window.globalUtils = {
    OFFER_TYPES: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    copyAdsArray: [],
    MIN_MAP_Y: 130,
    MAX_MAP_Y: 630,
    ESC_KEYCODE: 27,
    XHR_TIMEOUT: 10000,
    MAIN_PIN_START_COORDS: {},
    pinBlock: document.querySelector('.map__pins')
  };
})();
