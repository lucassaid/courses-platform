import { useState } from 'react'
import { Upload } from 'antd';
import { storage, auth } from '../firebase/index'
import axios from 'axios'
import createPlaceholder from '../lib/create-placeholder'

const CustomUpload = ({ path = '', children, limit, hideUploaded, ...props}) => {

  const [fileList, setFileList] = useState(props.fileList || [])

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    
    // temporarily authenticate with a new token
    try {
      const { data: uploadToken } = await axios.get('/api/uploadToken')
      await auth.signInWithCustomToken(uploadToken)
    } catch(err) {
      console.warn(err)
      onError()
      return
    }

    const storageRef = storage.ref()
    const fullPathd = `${path}${Date.now()}_${file.name}`
    const uploadTask = storageRef.child(fullPathd).put(file);

    uploadTask.on('state_changed', snapshot => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress({ percent })
      // switch (snapshot.state) {
      //   case firebase.storage.TaskState.PAUSED: // or 'paused'
      //     console.log('Upload is paused');
      //     break;
      //   case firebase.storage.TaskState.RUNNING: // or 'running'
      //     console.log('Upload is running');
      //     break;
      // }
    }, error => {
      console.log(error)
      onError()
      auth.signOut() // logout
    }, async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
      const placeholder = await createPlaceholder(file)
      await auth.signOut() // logout
      onSuccess({placeholder, downloadURL})
    });
  }

  const onChange = ({fileList: newFileList}) => {
    if(limit) {
      newFileList = newFileList.slice(-limit)
    }
    let formatedFileList = newFileList.map(file => {
      if(file.status != 'done') return file
      return {
        ...file,
        url: file.response.downloadURL,
        placeholder: file.response.placeholder
      }
    })
    props.onChange && props.onChange(formatedFileList)
    if(hideUploaded) {
      formatedFileList = formatedFileList.filter(file => file.status != 'done')
    }
    setFileList(formatedFileList);
  }

  return(
    <Upload 
      {...props}
      customRequest={uploadImage}
      fileList={fileList}
      onChange={onChange}
      accept="image/*"
    >
      {children}
    </Upload>
  )
}
export default CustomUpload