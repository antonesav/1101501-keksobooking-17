'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pin--main');
  var pinBlock = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var copyAdsArray = [];
  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', function (evt) {
    var changeValue = evt.target.value;
    changeFilters(changeValue);
  });

  function removePinBlockChild() {
    var pinBlockCollection = Array.from(pinBlock.children);
    pinBlockCollection.forEach(function (item) {
      if (item !== mapPin) {
        pinBlock.removeChild(item);
      }
    });
  }

  function changeFilters(elem) {
    var housingTypeArr = copyAdsArray.filter(function (value) {
      return value.offer.type === elem;
    });
    removePinBlockChild();
    renderAds(housingTypeArr);
  }

  function renderAds(adsArray) {
    var arrayAdsLength = adsArray.length > 5 ? 5 : adsArray.length;
    for (var i = 0; i < arrayAdsLength; i++) {
      fragment.appendChild(window.cardUtils.fillAds(adsArray[i]));
    }
    pinBlock.appendChild(fragment);
  }
  function successLoadHandler(data) {
    copyAdsArray = data;
    renderAds(copyAdsArray);
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
    renderFragmentAds: function () {
      window.loadUtils.load(successLoadHandler);
    }
  };
})();
