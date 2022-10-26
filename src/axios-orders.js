import axios from 'axios'

const instance= axios.create({
    baseURL: 'https://react-my-burger-9df4f-default-rtdb.firebaseio.com/'
})

export default instance