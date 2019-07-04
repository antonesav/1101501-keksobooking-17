'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  function renderAds(adsArray) {
    var arrayAdsLength = adsArray.length > 5 ? 5 : adsArray.length;
    for (var i = 0; i < arrayAdsLength; i++) {
      fragment.appendChild(window.cardUtils.fillAds(adsArray[i]));
    }
    window.globalUtils.pinBlock.appendChild(fragment);
  }
  function successLoadHandler(data) {
    window.globalUtils.copyAdsArray = data;
    renderAds(window.globalUtils.copyAdsArray);
  }

  // Заполнение указателей
  window.cardUtils = {
    fillAds: function (ad) {
      var pinElem = pinTemplate.cloneNode(true);
      pinElem.style.left = ad.location.x + 'px';
      pinElem.style.top = ad.location.y + 'px';
      pinElem.querySelector('img').src = ad.author.avatar;
      pinElem.querySelector('img').alt = ad.offer.title;
      return pinElem;
    },
    renderAds: function (adsArray) {
      var arrayAdsLength = adsArray.length > 5 ? 5 : adsArray.length;
      for (var i = 0; i < arrayAdsLength; i++) {
        fragment.appendChild(window.cardUtils.fillAds(adsArray[i]));
      }
      window.globalUtils.pinBlock.appendChild(fragment);
    },
    renderFragmentAds: function () {
      window.loadUtils.load(successLoadHandler);
    }
  };
})();
