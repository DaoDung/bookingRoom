import axios from 'axios'

export default{
    login (query, cb, errorcb) {
        let dataPost = new URLSearchParams()
        for(let key in query){
          dataPost.append(key, query[key])
        }
        axios.get('http://localhost:3000/users/login')
            .then((res) => {
                cb(res.data) 
            })
            .catch(function (error) {
                errorcb(error)
            })
    },
    signin (query, cb, errorcb) {
        let dataPost = new URLSearchParams()
        for(let key in query){
          dataPost.append(key, query[key])
        }
        axios.post('http://localhost:3000/users/login', dataPost)
            .then((res) => {
                cb(res.data) 
            })
            .catch(function (error) {
                errorcb(error)
            })
    }
}

