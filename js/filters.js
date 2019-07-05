'use strict';
(function () {
  var Price = {
    LOW: 1000,
    MEDIUM: 10000,
    HIGH: 100000
  };
  var filtersBlock = document.querySelector('.map__filters');
  var mapPin = document.querySelector('.map__pin--main');
  var filterParams = {};

  function housingChangeHandler(evt) {
    filterParams[evt.target.name] = evt.target.value;
    console.log(filterParams);
    changeFilters(filterParams.name);
    //var fiteredList = filterOffers(array, filterParams);
  }

  // function initFilters(){
  filtersBlock.addEventListener('change', housingChangeHandler);
  // }

  function changeFilters(value) {
    var filterByType = window.globalUtils.copyAdsArray.filter(function (item) {
      return item.offer.type === value;
    });
    // var filterByRooms = window.globalUtils.copyAdsArray.filter(function (item) {
    //   return item.offer.rooms === Number(value);
    // });
    // var filterByPrice = window.globalUtils.copyAdsArray.filter(function (item) {
    //   return item.offer.price === value;
    // });
    // var filterByGuests = window.globalUtils.copyAdsArray.filter(function (item) {
    //   return item.offer.guests === Number(value);
    // });

    var filteredAds = filterByType.concat(window.globalUtils.copyAdsArray);
    var uniqueAds =
      filteredAds.filter(function (it, i) {
        return filteredAds.indexOf(it) === i;
      });
    removePinBlockChild();
    console.log(uniqueAds);
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
