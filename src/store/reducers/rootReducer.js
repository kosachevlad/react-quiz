import { combineReducers } from "redux"
import createReduser from "./create"
import quizReducer from "./quiz"

export default combineReducers({
  quiz: quizReducer,
  create: createReduser
})