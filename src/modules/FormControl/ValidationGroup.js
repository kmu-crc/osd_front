import {FormControl} from "./FormControl";
import FormDataToJson from "modules/FormDataToJson";

export const ValidationGroup = async (list, isJSON) => {
  console.log("list : ", list);
  console.log('7');
  var qListArray = [];

  for (let key in list) {
    await qListArray.push(FormControl(list[key]));
  }

  console.log("qListArray", qListArray)
  return new Promise(function (resolve, reject) {
      console.log('8');
      Promise.all(qListArray).then(async res => {
          let formData = new FormData();
          for (let key in list) {
            console.log("list[key]", list[key]);
            if(!list[key] || !list[key].hasOwnProperty("value")) continue;
            if(key.indexOf("[") > -1){
              if(list[key].value.length > 0) {
                console.log("key", key);
                await Array.from(list[key].value).map(async item => {
                  await formData.append(key, item, item.name);
                });
              }
            } else {
              await formData.append(key, list[key].value);
            }
          }

          if(isJSON){
            formData = FormDataToJson(formData)
          }
          resolve(formData);
      }).catch(err => {
        console.log(err);
        err.target.focus();
        reject(err);
      })
  })
};
