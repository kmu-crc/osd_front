function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // Firefox를 제외한 모든 브라우저
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // 코드가 존재하지 않을 수도 있기 때문에 테스트 이름 필드도 있습니다.
      // Firefox를 제외한 모든 브라우저
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
      storage.length !== 0;
  }
}

function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = atob(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

export const SetSession = (key, data) => {
  return new Promise((resolve, reject) => {
    if (storageAvailable("localStorage")) {
      window.localStorage.setItem(key, data)
    } else {
      setCookie(key, data, 7);
    }
    resolve(data);
  });
};

const getCookie = (cookie_name) => {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x === cookie_name) {
      return btoa(y); // unescape로 디코딩 후 값 리턴
    }
  }
  return null;
};

export const GetSession = (key) => {
  return new Promise((resolve, reject) => {
    let token = null;
    if (storageAvailable("localStorage")) {
      token = window.localStorage.getItem(key);
    } else {
      token = getCookie(key);
    }
    if(token == null){
      reject(null);
    } else {
      resolve(token);
    }
  });
};
