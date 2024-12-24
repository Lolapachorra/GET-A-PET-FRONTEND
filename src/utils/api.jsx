import axios from 'axios';
//"https://get-a-pet-apirestful.onrender.com"
//"http://localhost:5000"
export default axios.create({
    baseURL: "https://get-a-pet-apirestful.onrender.com"
})