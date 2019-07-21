'use strict';
(function () {
  var filtersBlock = document.querySelector('.map__filters');
  var filterByType = document.querySelector('#housing-type');
  var filterByPrice = document.querySelector('#housing-price');
  var filterByRooms = document.querySelector('#housing-rooms');
  var filterByGuests = document.querySelector('#housing-guests');
  var featuresBlock = document.querySelector('.map__features');
  var featuresBlockItems = featuresBlock.querySelectorAll('input[type=checkbox]');
  var pinsBLock = document.querySelector('.map__pins');
  var lastTimeout;
  var FILTER_DELAY = 500;
  var FILTER_PRICE_VALUE = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  function initFilter() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.map__card');
    var featuresChecked = [].slice.call(featuresBlockItems).filter(function (item) {
      return (item.checked === true);
    });
    var filterObj = {
      type: filterByType.value,
      price: filterByPrice.value,
      rooms: filterByRooms.value,
      guests: filterByGuests.value,
      features: featuresChecked.map(function (item) {
        return item.value;
      })
    };

    for (var key in filterObj) {
      if (filterObj[key] === 'any') {
        delete filterObj[key];
      }
    }

    var filteredAds = window.data.ads.filter(function (item) {
      var offer = item.offer;

      if (filterObj.type && filterObj.type !== offer.type) {
        return false;
      }
      if (filterObj.price && !(FILTER_PRICE_VALUE[filterObj.price].min <= offer.price && offer.price <= FILTER_PRICE_VALUE[filterObj.price].max)) {
        return false;
      }
      if (filterObj.rooms && +filterObj.rooms !== offer.rooms) {
        return false;
      }
      if (filterObj.guests && +filterObj.guests !== offer.guests) {
        return false;
      }
      if (filterObj.features.length) {
        return filterObj.features.every(function (elem) {
          return (offer.features.indexOf(elem) !== -1);
        });
      }
      return true;
    });

    pins.forEach(function (item) {
      pinsBLock.removeChild(item);
    });

    if (card) {
      window.data.mapBlock.removeChild(card);
    }

    window.cardUtils.renderAds(filteredAds);
  }

  function debounce(func) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(func, FILTER_DELAY);
  }

  filtersBlock.addEventListener('change', function (evt) {
    if (evt.target.tagName === 'SELECT') {
      debounce(initFilter);
    }
  });

  featuresBlock.addEventListener('click', function (evt) {
    if (evt.target.name === 'features') {
      debounce(initFilter);
    }
  });

})();
