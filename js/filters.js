'use strict';
(function () {
  var filtersBlock = document.querySelector('.map__filters');
  var mapPin = document.querySelector('.map__pin--main');
  var filterParams = {};
  var checkedFeatures = {};
  // hi

  function housingChangeHandler(evt) {
    var name = evt.target.name;
    filterParams[name] = evt.target.value;
    filterOffers(window.globalUtils.copyAdsArray, name, filterParams[name]);
  }

  function filterOffers(array, name, paramValue) {
    var initialAds = array;
    var filteredAds;

    filteredAds = initialAds.filter(function (item) {
      if (filterParams[name] === 'any') {
        return item;
      }
      return item.offer[name].toString() === filterParams[name];
    });

    if (filterParams.features) {
      filteredAds = getCheckedFeatures(array, paramValue);
    }

    removePinBlockChild();
    window.cardUtils.renderAds(filteredAds);
  }

  function getCheckedFeatures(array, valueElement) {
    var checkedFeatureElements = [];

    if (checkedFeatures[valueElement]) {
      checkedFeatures[valueElement] = false;
    } else {
      checkedFeatures[valueElement] = true;
    }

    array.forEach(function (elem) {
      var arrayOffers = elem.offer.features;
      var filteredFeatures = arrayOffers.filter(function (item) {
        return checkedFeatures['' + item + ''] === true;
      });
      if (arrayOffers.length && arrayOffers.length === filteredFeatures.length) {
        checkedFeatureElements.push(elem);
      }
    });
    return checkedFeatureElements;
    // console.log(checkedFeatureElements);
  }

  filtersBlock.addEventListener('change', housingChangeHandler);

  function removePinBlockChild() {
    Array.from(window.globalUtils.pinBlock.children).forEach(function (pinNode) {
      if (pinNode !== mapPin) {
        window.globalUtils.pinBlock.removeChild(pinNode);
      }
    });
  }
})();
