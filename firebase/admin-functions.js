import firebase, { firestore } from './admin'
import functionsCreator from './functionsCreator'

const {
  getDoc,
  getList,
  add,
  update,
} = functionsCreator({firebase, firestore})

export {
  getDoc,
  getList,
  add,
  update,
}