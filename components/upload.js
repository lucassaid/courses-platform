import { useState } from 'react'
import { Upload } from 'antd';
import { storage, firebase } from '../firebase'

const CustomUpload = ({ folder, children, ...props}) => {

  const [fileList, setFileList] = useState(props.fileList || [])
  const [filesURLs, setFilesURLs] = useState({})

  const uploadImage = options => {
    const { onSuccess, onError, file, onProgress } = options;
    const storageRef = storage.ref()

    const path = `images/${folder ? `${folder}/` : ''}`
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
    }, async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
      setFilesURLs({[file.uid]: downloadURL})
      onSuccess()
    });
  }

  const onChange = ({fileList: newFileList}) => {
    const formatedFileList = newFileList.map(file => {
      const url = filesURLs[file.uid]
      if(!url) return file
      return {
        uid: file.uid,
        name: file.name,
        url,
        status: 'done'
      }
    })
    setFileList(formatedFileList);
    props.onChange && props.onChange(formatedFileList)
  }

  return(
    <Upload 
      {...props}
      customRequest={uploadImage}
      fileList={fileList}
      onChange={onChange}
    >
      {children}
    </Upload>
  )
}
export default CustomUpload