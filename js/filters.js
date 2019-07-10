'use strict';
(function () {
  var filtersBlock = document.querySelector('.map__filters');
  var mapPin = document.querySelector('.map__pin--main');
  var mainOverlay = document.querySelector('.map__overlay');
  var filterParams = {};
  var checkedFeatures = {};

  function housingChangeHandler(evt) {
    var name = evt.target.name;
    filterParams[name] = evt.target.value;
    renderCollectFilters(window.globalUtils.copyAdsArray, name, filterParams[name]);
  }

  // фильтрация housing
  function filterOffers(array, name) {
    return array.filter(function (item) {
      if (filterParams[name] === 'any') {
        return item;
      }
      return item.offer[name].toString() === filterParams[name];
    });
  }

  // фильтрация features
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
  }
  // Не понятно,как с этим работать
  function collectFilters(array, name, paramValue) {
    return filterOffers(array, name).concat(getCheckedFeatures(array, paramValue));
  }

  function renderCollectFilters(arrayAds, nameElement, valueElement) {
    removePinBlockChild();
    window.cardUtils.renderAds(collectFilters(arrayAds, nameElement, valueElement));
  }

  filtersBlock.addEventListener('change', housingChangeHandler);

  function removePinBlockChild() {
    Array.from(window.globalUtils.pinBlock.children).forEach(function (pinNode) {
      if (pinNode !== mapPin && pinNode !== mainOverlay) {
        window.globalUtils.pinBlock.removeChild(pinNode);
      }
    });
  }
})();
