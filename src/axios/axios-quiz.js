import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-dc68a-default-rtdb.europe-west1.firebasedatabase.app/'
})