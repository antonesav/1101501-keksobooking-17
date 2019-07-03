'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinBlock = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('change', function (evt) {
    var type = housingType.value;
    var housingTypeArr = window.globalUtils.saveAdsArray.filter(function (value) {
      return value.offer.type === type;
    });
    updatesAds(housingTypeArr);
  });

  function updatesAds(elem) {
    renderAds(elem);
  }

  function renderAds(adsArray) {
    var arrayAdsLength = adsArray.length > 5 ? 5 : adsArray.length;
    for (var i = 0; i < arrayAdsLength; i++) {
      fragment.appendChild(window.cardUtils.fillingAds(adsArray[i]));
    }
    pinBlock.appendChild(fragment);
  }
  function successLoadHandler(data) {
    window.globalUtils.saveAdsArray = data;
    updatesAds(window.globalUtils.saveAdsArray);
  }

  // Заполнение указателей
  window.cardUtils = {
    fillingAds: function (ad) {
      var pinElem = pinTemplate.cloneNode(true);
      pinElem.style.left = ad.location.x + 'px';
      pinElem.style.top = ad.location.y + 'px';
      pinElem.querySelector('img').src = ad.author.avatar;
      pinElem.querySelector('img').alt = ad.offer.title;
      return pinElem;
    },
    renderFragmentAds: function () {
      window.loadUtils.load(successLoadHandler);
    }
  };
})();
