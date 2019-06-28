'use strict';
(function () {
  window.uploadUtils = {
    url: 'https://js.dump.academy/keksobooking',
    upload: function (data, onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onSuccess('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('POST', window.uploadUtils.url);
      xhr.send(data);
    }
  };
})();
