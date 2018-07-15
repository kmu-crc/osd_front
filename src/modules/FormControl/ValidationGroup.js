import {FormControl} from "./FormControl";
import FormDataToJson from "modules/FormDataToJson";

export const ValidationGroup = async (list, isJSON) => {
  console.log("list : ", list);
  console.log('7');
  var qListArray = [];

  for (let key in list) {
    list[key].compulsion = true
    await qListArray.push(FormControl(list[key]));
  }

  console.log("qListArray", qListArray)
  return new Promise(function (resolve, reject) {
      console.log('8');
      Promise.all(qListArray).then(async res => {
          let formData = new FormData();
          for (let key in list) {
            await formData.append(key, list[key].value);
          }

          if(isJSON){
            formData = FormDataToJson(formData)
          }
          resolve(formData);
      }).catch(err => {
        err.target.focus();
        reject(err);
      })
  })
};
