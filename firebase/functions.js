import { firestore, firebase} from './index';

const getDoc = async (docId, config) => {
  try {
    const doc = await getRef(config, docId).get()
    if(doc.exists) return {[doc.id]: doc.data()}
    throw new Error('No such document!')
  } catch(e) {
    throw e
  }
}

const getList = async (config) => {
  try {
    const querySnapshot = await getRef(config).get()
    let result = {}
    querySnapshot.forEach(doc => result[doc.id] = doc.data())
    return result
  }
  catch(e) {
    throw e
  }
}

const post = async (doc, config) => {
  try {
    doc.createdAt = firebase.firestore.Timestamp.now()
    const newDoc = await getRef(config).add(doc)
    return {[newDoc.id]: doc}
  } catch(e) {
    throw e
  }
}

const update = async (doc, config) => {
  try {
    doc.lastUpdate = firebase.firestore.Timestamp.now()
    const updateRes = await getRef(config).update(doc)
    return updateRes
  } catch(e) {
    throw e
  }
}

export {
  getDoc,
  getList,
  post,
  update,
}

const getRef = (config, docId) => {
  // TODO falla si en el config hay un where o un orderBy
  // y queremos usar el ref para un ref.add(doc)
  let ref = firestore
  const  { path, orderBy, wheres } = config
  // adding .doc() and .collection() iterating the path
  path.forEach((key, i) => ref = i % 2 ? ref.doc(key) : ref.collection(key))
  // return if we are only looking for one doc
  if(docId) return ref.doc(docId)
  // adding orderBy. Expected array => ['createdAt', 'desc'] or ['createdAt']
  if(orderBy) ref = ref.orderBy(...orderBy)
  // adding where(s). Expected array => [['idParent', '==', docId],[]]
  if(wheres) wheres.forEach(where => ref = ref.where(...where))
  // return reference
  return ref
}
