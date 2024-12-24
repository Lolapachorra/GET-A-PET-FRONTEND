import axios from 'axios';
//"https://get-a-pet-apirestful.onrender.com"
export default axios.create({
    baseURL: "http://localhost:5000"
})