import axios from 'axios'
import store from '../store'

const createVideo = async (fileSize) => {
  const r = await axios({
    method: 'post',
    url: 'https://api.vimeo.com/me/videos',
    data: {
      "upload": {
        "approach": "tus",
        "size": fileSize
      }
    },
    headers: {
      'Authorization': `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      'Content-Type':	'application/json',
      'Accept':	'application/vnd.vimeo.*+json;version=3.4'
    }
  })
  if(r.status != 200) throw new Error(r)
  if(r.data.upload.approach != 'tus') throw new Error('Approach is not tus')
  return {
    upload_link: r.data.upload.upload_link,
    uri: r.data.uri
  }
}

const upload = async (upload_link, file, updateProgress, id) => {
  const r = await axios({
    method: 'patch',
    url: upload_link,
    data: file,
    headers: {
      'Tus-Resumable': '1.0.0',
      'Upload-Offset': 0,
      'Content-Type':	'application/offset+octet-stream',
      'Accept':	'application/vnd.vimeo.*+json;version=3.4'
    },
    onUploadProgress: progressEvent => {
      let progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
      store.dispatch(updateProgress({id, progress}))
    }
  })
  return r
}


export default async function uploadVideo(id, file, actions) {
  const { updateFileProgress, setErroredFile } = actions

  try {
    const { upload_link, uri } = await createVideo(file.size)
    const binaryData = await readFileAsync(file)
    const uploadData = await upload(upload_link, binaryData, updateFileProgress, id)
    if(uploadData.headers['upload-offset'] == file.size) {
      return uri
    } else {
      throw new Error('Video was not uploaded')
    }
  } catch(err) {
    console.error(err)
    store.dispatch(setErroredFile({id}))
  }

}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  })
}