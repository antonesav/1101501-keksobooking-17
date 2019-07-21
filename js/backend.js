'use strict';
(function () {
  var SUCCESS_STATUS = 200;
  window.backend = {
    upload: function (data, onSuccess, onError) {
      var url = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('POST', url);
      xhr.send(data);
    },

    load: function (data, onSuccess, onError) {
      var url = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          data(xhr.response);
          onSuccess('Данные успешно загружены');
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = window.data.XHR_TIMEOUT;
      xhr.open('GET', url);
      xhr.send();
    }
  };
})();
