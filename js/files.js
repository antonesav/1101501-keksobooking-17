'use strict';
(function () {
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoFileChooser = document.querySelector('.ad-form__photo-container input[type=file]');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_WITH = 70;
  var PHOTO_HEIGHT = 70;
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  function checkTypeFile(file) {
    return FILE_TYPES.some(function (value) {
      return file.name.toLowerCase().endsWith(value);
    });
  }


  function loadPhoto(file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var customElement = document.createElement('img');

      customElement.width = PHOTO_WITH;
      customElement.height = PHOTO_HEIGHT;
      customElement.src = reader.result;

      if (!photoPreview.querySelector('img')) {
        photoPreview.appendChild(customElement);
      } else {

        var parentCustomElement = document.createElement('div');

        parentCustomElement.classList.add('ad-form__photo');
        parentCustomElement.appendChild(customElement);
        photoPreview.parentElement.appendChild(parentCustomElement);
      }
    });
    reader.readAsDataURL(file);
  }


  function avatarChooseHandler() {
    var file = avatarFileChooser.files[0];

    if (checkTypeFile(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function photoChooseHandler() {
    var files = Array.from(photoFileChooser.files);
    var matches = files.filter(checkTypeFile);
    if (matches) {
      matches.forEach(loadPhoto);
    }
  }


  avatarFileChooser.addEventListener('change', avatarChooseHandler);
  photoFileChooser.addEventListener('change', photoChooseHandler);

  window.files = {
    clearFormPhoto: function () {
      avatarPreview.src = DEFAULT_AVATAR_SRC;
      while (photoPreview.firstChild) {
        photoPreview.firstChild.remove();
      }

      while (photoPreview.parentElement.lastElementChild.hasChildNodes()) {
        photoPreview.parentElement.lastElementChild.remove();
      }
    }
  };
})();
