const ContentForm = async (data) => {
  let formData = {
    updateContent: [],
    newContent: [],
    deleteContent: []
  }
  formData.deleteContent = await [...data.deleteContent];
  await data.content.map(async item => {
    delete item.target;
    console.log(item, item.uid)
    if(item.uid){
      await formData.updateContent.push(item);
    } else {
      await formData.newContent.push(item);
    }
  });
  return formData;
}


export default ContentForm;
