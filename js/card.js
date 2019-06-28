'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinBlock = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  function successLoadHandler(ads) {
    for (var j = 0; j < ads.length; j++) {
      fragment.appendChild(window.cardUtils.renderAds(ads[j]));
    }
    pinBlock.appendChild(fragment);
  }
  function err(erR) {
    alert(erR);
  }
  // Заполнение указателей
  window.cardUtils = {
    renderAds: function (ad) {
      var pinElem = pinTemplate.cloneNode(true);
      pinElem.style.left = ad.location.x + 'px';
      pinElem.style.top = ad.location.y + 'px';
      pinElem.querySelector('img').src = ad.author.avatar;
      pinElem.querySelector('img').alt = ad.offer.title;
      return pinElem;
    },
    renderFragmentAds: function () {
      window.loadUtils.load(successLoadHandler, err);
    }
  };
})();
