export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileRead = new FileReader()
        fileRead.readAsDataURL(file);
        fileRead.onload = () => {
            resolve(fileRead.result)
        };
        fileRead.onerror = (error) => {
            reject(error)
        }
    })
}