import host from "config"

export const FileUploadRequest = file => {
    return new Promise(async (resolve, reject) => {
        const formData = new FormData();
        await formData.append('source', file[0]);
        fetch(`${host}/upload/tmp`, {
            header: { 'Content-Type': 'multipart/form-data' },
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => resolve(data || null))
            .catch(err => reject(err));
    });
}
