import host from "config";
const Validates = {};

Validates.required = value => {
  return new Promise((resolve, reject) => {
    let data = value ? undefined : "Required";
    resolve(data);
  });
};

Validates.email = value => {
  return new Promise((resolve, reject) => {
    if(!value) resolve(undefined);
    let data = value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "잘못된 E-Mail형식입니다."
    : undefined
    resolve(data);
  });
};

Validates.NotSpecialCharacters = value => {
  return new Promise((resolve, reject) => {
    if(!value) resolve(undefined);
    let data = value && !/^[a-zA-Zㄱ-힣0-9]*$/i.test(value)
    ? "특수문자는 사용할 수 없습니다."
    : undefined
    resolve(data);
  });
};

Validates.onlyImages = value => {
  return new Promise((resolve, reject) => {
    if(!value) resolve(undefined);
    let data = undefined;
    if(value.type === "image/jpeg" || value.type === "image/png" || value.type === "image/gif" || value.type === "image/bmp" || value.type === "image/webp") {
      data = undefined;
    } else {
      data = "이미지만 업로드 가능합니다.";
    }
    resolve(data);
  });
}

Validates.ThumbnailSize = value => {
  return new Promise((resolve, reject) => {
    if(!value) resolve(undefined);
    let data = undefined;
    if(value.size < 10000001) {
      data = undefined;
    } else {
      data = "파일 용량이 너무 큽니다.";
    }
    resolve(data);
  });
}

Validates.MinLength2 = value => {
  return new Promise((resolve, reject) => {
    if(!value) resolve(undefined);
    let data = undefined;
    console.log(value.length > 2);
    if(value.length > 2) {
      data = undefined;
    } else {
      console.log("??");
      data = "2자 이상 입력해 주세요.";
    }
    resolve(data);
  });
}

Validates.checkEmail = (value) => {
  return fetch(`${host}/users/checkEmail`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ email: value }) })
        .then(res => res.json())
        .then(res => {
          if(!value) return Promise.resolve(undefined);
          return res.success
          ? undefined
          : res.error
        })
};

Validates.checkNickName = (value) => {
  return fetch(`${host}/users/checkNickName`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ nick_name: value }) })
        .then(res => res.json())
        .then(res => {
          if(!value) return Promise.resolve(undefined);
          return res.success
          ? undefined
          : res.error
        })
};

Validates.checkFBUser = (value) => {
  return fetch(`${host}/users/checkFBUser`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ FB_user_id: value }) })
        .then(res => res.json())
        .then(res => {
          if(!value) return Promise.resolve(undefined);
          return res.success
          ? undefined
          : res.error
        })
};

export default Validates;
