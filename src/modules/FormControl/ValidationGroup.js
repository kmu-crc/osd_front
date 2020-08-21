import { FormControl } from "./FormControl";

export const ValidationGroup = async (list, isJSON) => {
  //console.log("list : ", list);
  //console.log("7");
  var qListArray = [];

  for (let key in list) {
    await qListArray.push(FormControl(list[key]));
  }

  //console.log("qListArray", qListArray);
  return new Promise(function (resolve, reject) {
    //console.log("8");
    const readUploadedFileAsText = inputFile => {
      const temporaryFileReader = new FileReader();

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
      });
    };
    Promise.all(qListArray)
      .then(async res => {
        let formData = {
          files: []
        };
        for (let key in list) {
          //console.log("list[key]", list[key]);
          if (!list[key] || !list[key].hasOwnProperty("value")) continue;
          if (key.indexOf("[") > -1) {
            if (list[key].value.length > 0) {
              //console.log("key", key);
              for (let item of Array.from(list[key].value)) {
                let fileUrl = await readUploadedFileAsText(item);
                let file = {
                  value: fileUrl,
                  name: item.name,
                  key: key
                };
                //console.log("formData.files", formData.files);
                formData.files.push(file);
              }
            }
          } else {
            if (
              list[key].value.length > 0 &&
              list[key].value.hasOwnProperty("name")
            ) {
              let fileUrl = await readUploadedFileAsText(list[key].value);
              let file = {
                value: fileUrl,
                name: list[key].value.name,
                key: key
              };
              formData.files.push(file);
            } else {
              formData[key] = await list[key].value;
            }
          }
        }
        //console.log("22222");
        if (formData.files.length === 0) delete formData.files;
        resolve(formData);
      })
      .catch(err => {
        console.error(err);
        err.target.focus();
        reject(err);
      });
  });
};
