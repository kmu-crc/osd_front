import Validates from "modules/Validates/Validates2";

export const FormControl = async obj => {
  // console.log("obj", typeof obj);
  if (obj === null) {
    console.log("nulll");
  }
  if (!obj || !obj.hasOwnProperty("value")) return Promise.resolve(true);
  // console.log("4", obj);
  // 검사받을 하나의 validation
  // console.log("검사받을 인풋의 arg : ", list);
  let value = obj.value; // 전달받은 인풋의 데이터
  let target = obj.target; // validation할 대상의 이름
  let fnList = [...obj.validates]; // validation할 함수들의 리스트
  let fnData = null;
  let qArray = []; // Promise를 저장할 배열

  for (let i = 0; i < fnList.length; i++) {
    // fnList에 전달받은 검사항목들을 매칭시켜 qArray에 담는다.
    if (fnList[i].indexOf("(") > -1) {
      let fn = fnList[i].split("(");
      let fnDatas = fn[1].split(")");
      fnList[i] = fn[0];
      fnData = fnDatas[0];
      // console.log(
      //   "fn : ",
      //   fn,
      //   "fnDatas :",
      //   fnDatas,
      //   "fnList[i] :",
      //   fnList[i],
      //   "fnData : ",
      //   fnData
      // );
    }
    if (Validates[fnList[i]]) {
      await qArray.push(Validates[fnList[i]](value, target, fnData));
    }
  }
  return new Promise(function (resolve, reject) {
    // console.log("5");
    target.classList.remove("error");
    target.nextSibling.textContent = "";
    if (qArray.length === 0) resolve(true);
    Promise.all(qArray)
      .then(res => {
        // console.log(target, res);
        resolve(true);
      })
      .catch(err => {
        target.classList.add("error");
        target.nextSibling.textContent = err.message;
        reject(err);
      });
  });
};
