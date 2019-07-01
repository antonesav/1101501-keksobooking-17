'use strict';
(function () {
  window.loadUtils = {
    url: 'https://js.dump.academy/keksobooking/data',
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = window.globalUtils.XHR_TIMEOUT;
      xhr.open('GET', window.loadUtils.url);
      xhr.send();
    }
  };
})();
