import { storage } from '../firebase/index'
import store from '../store'

export default async function uploadToStorage(id, file, path = '/', actions) {
  return new Promise((res, rej) => {
    const storageRef = storage.ref()
    const uploadTask = storageRef.child(path).put(file);
    const { updateFileProgress, setErroredFile } = actions
  
    uploadTask.on('state_changed', snapshot => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      store.dispatch(updateFileProgress({ id, progress: percent }))
    }, error => {
      store.dispatch(setErroredFile({id}))
      rej(error)
    }, async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
      res(downloadURL)
    });
  })
}