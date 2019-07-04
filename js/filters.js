'use strict';
(function () {
  var filtersBlock = document.querySelector('.map__filters');
  var mapPin = document.querySelector('.map__pin--main');
  function housingChangeHandler(evt) {
    var changeValue = evt.target.value;
    changeFilters(changeValue);
  }

  filtersBlock.addEventListener('change', housingChangeHandler);

  function changeFilters(value) {
    var filterByType = window.globalUtils.copyAdsArray.filter(function (item) {
      return item.offer.type === value;
    });
    var filterByRooms = window.globalUtils.copyAdsArray.filter(function (item) {
      return item.offer.rooms === value;
    });
    var filterByPrice = window.globalUtils.copyAdsArray.filter(function (item) {
      return item.offer.price === value;
    });
    var filterByGuests = window.globalUtils.copyAdsArray.filter(function (item) {
      return item.offer.guests === value;
    });

    var filteredAds = filterByType.concat(filterByRooms).concat(filterByPrice).concat(filterByGuests).concat(window.globalUtils.copyAdsArray);
    var uniqueAds =
      filteredAds.filter(function (it, i) {
        return filteredAds.indexOf(it) === i;
      });
    removePinBlockChild();
    window.cardUtils.renderAds(uniqueAds);
  }

  function removePinBlockChild() {
    Array.from(window.globalUtils.pinBlock.children).forEach(function (pinNode) {
      if (pinNode !== mapPin) {
        window.globalUtils.pinBlock.removeChild(pinNode);
      }
    });
  }
})();
