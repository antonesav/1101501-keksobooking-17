'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var offerType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

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

  features.forEach(function (item) {
    hideFeature(item, ad.offer.features);
  });

  var startSymbol = '--';
  var hideFeature = function (node, features) {
    // features.classList.contains('.popup__feature--' + features);
    if (features.indexOf(node.classList[1].slice(node.classList[1].indexOf(startSymbol) + startSymbol.length)) === -1) {
      node.classList.add('visually-hidden');
    }
  };

  function renderPhoto(node, adElements) {
    var fragmentPhoto = document.createDocumentFragment();
    var cardPhotoParent = node.querySelector('.popup__photos');
    var cardPhoto = cardPhotoParent.querySelector('.popup__photo');
    var cloneCardPhoto = cardPhoto.cloneNode(true);

    cardPhotoParent.removeChild(cardPhotoParent.firstElementChild);
    adElements.offer.photos.forEach(function (item) {
      fragmentPhoto.appendChild(cloneCardPhoto.src = item);
    });
    cardPhotoParent.appendChild(fragmentPhoto);
  }

  function cardContent(ad) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = offerType[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд после ' + ad.offer.checkout;
    var features = card.querySelector('.popup__features');
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__photos').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    renderPhoto(card, ad);
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
    renderAds: renderAds,
    renderFragmentAds: function () {
      window.loadUtils.load(successLoadHandler);
    }
  };
})();
