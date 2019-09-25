const FormDataToJson = (formData) => {
  let jsonObject = {};
  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
  }
  return jsonObject;
}

export default FormDataToJson;
