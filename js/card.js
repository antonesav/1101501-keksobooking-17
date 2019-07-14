'use strict';
(function () {
  var mapBlock = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();
  var MAX_LENGTH_ADS = 5;
  var OfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  function successLoadHandler(data) {
    window.globalUtils.ads = data;
    window.cardUtils.renderAds(window.globalUtils.ads);
  }

  var symbolClass = '--';
  var hideFeature = function (node, features) {
    // features.classList.contains('.popup__feature--' + features);
    if (features.indexOf(node.classList[1].slice(node.classList[1].indexOf(symbolClass) + symbolClass.length)) === -1) {
      node.classList.add('visually-hidden');
    }
  };

  function renderPhoto(node, adElements) {
    var fragmentPhoto = document.createDocumentFragment();
    var cardPhotoParent = node.querySelector('.popup__photos');
    var cardPhoto = cardPhotoParent.querySelector('.popup__photo');

    cardPhotoParent.removeChild(cardPhotoParent.firstElementChild);
    adElements.map(function (item) {
      var cloneCardPhoto = cardPhoto.cloneNode(true);
      cloneCardPhoto.src = item;
      fragmentPhoto.appendChild(cloneCardPhoto);
    });
    cardPhotoParent.appendChild(fragmentPhoto);
  }

  function cardContent(ad) {
    var card = cardTemplate.cloneNode(true);
    var closeCard = card.querySelector('.popup__close');
    var features = card.querySelector('.popup__features').querySelectorAll('.popup__feature');

    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = OfferType[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд после ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    renderPhoto(card, ad.offer.photos);

    features.forEach(function (item) {
      hideFeature(item, ad.offer.features);
    });
    closeCard.addEventListener('click', clickCloseCardHandler);
    document.addEventListener('keydown', escHandler);
    return card;
  }


  function clickCloseCardHandler(evt) {
    evt.preventDefault();
    var card = mapBlock.querySelector('.map__card');
    mapBlock.removeChild(card);
    document.removeEventListener('keydown', escHandler);
  }


  function escHandler(evt) {
    var card = mapBlock.querySelector('.map__card');
    if (evt.keyCode === window.globalUtils.ESC_KEYCODE) {
      mapBlock.removeChild(card);
      document.removeEventListener('keydown', escHandler);
    }
  }


  // Заполнение указателей
  window.cardUtils = {
    renderAds: function (adsArray) {
      var arrayAdsLength = adsArray.length > MAX_LENGTH_ADS ? MAX_LENGTH_ADS : adsArray.length;
      adsArray.forEach(function (item, index) {
        if (index < arrayAdsLength) {
          fragment.appendChild(window.pinUtils.fillPins(item));
        }
      });
      window.globalUtils.pinBlock.appendChild(fragment);
    },

    renderFragmentAds: function () {
      window.loadUtils.load(successLoadHandler);
    },

    renderCard: function (data) {
      var card = mapBlock.querySelector('.map__card');
      if (card) {
        mapBlock.removeChild(card);
      }
      mapBlock.insertBefore(cardContent(data), filterContainer);
    }
  };
})();
