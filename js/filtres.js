'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var mapPin = document.querySelector('.map__pin--main');

  housingType.addEventListener('change', function (evt) {
    var changeValue = evt.target.value;
    changeFilters(changeValue);
  });

  // function getRank(ads) {
  //   var rank = 0;
  //   if (ads.offer.type === 'house') {
  //     rank += 2;
  //   } else {
  //     rank += 0;
  //   }
  //   return rank;
  // }

  function removePinBlockChild() {
    Array.from(window.globalUtils.pinBlock.children).forEach(function (pinNode) {
      if (pinNode !== mapPin) {
        window.globalUtils.pinBlock.removeChild(pinNode);
      }
    });
  }

  function changeFilters(elem) {
    var housingTypeArr = window.globalUtils.copyAdsArray.filter(function (value) {
      return value.offer.type === elem;
    });
    var filteredAds = housingTypeArr.concat(window.globalUtils.copyAdsArray);
    var uniqueAds =
      filteredAds.filter(function (it, i) {
        return filteredAds.indexOf(it) === i;
      });
    removePinBlockChild();
    window.cardUtils.renderAds(uniqueAds);
    // window.cardUtils.renderAds(uniqueAds.sort(function (a, b) {
    //   return getRank(b) - getRank(a);
    // }));
  }
})();
