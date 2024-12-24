//api
import api from "../utils/api";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import useFlashMessage from "./useFlashMessage";
export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate();

     useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true);
        }
     }, [])

    const {setFlashMessage} = useFlashMessage()
    async function register(user){
       let msgText = "Cadastro realizado com sucesso"
       let msgType = "success"
        try{
           const data = await api.post('/users/register', user).then((response) => response.data);
           //console.log("Registro bem-sucedido:", data); // Para depuração
           await authUser(data);
        }
        catch(error){
            console.log(error.message)
            msgText = error.response?.data?.error || error.response?.data?.message || "Ocorreu um erro inesperado" ; // Tratamento robusto
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }
    async function authUser(data){
    
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify(data.token))
     // console.log(data.token)
      //console.log(data)
      navigate('/')
      window.location.reload();
      
    }
    async function login(user){
        let msgText = "Login realizado com sucesso"
        let msgType = "success"
        try{
            const data = await api.post('/users/login', user).then((response) => response.data);
            await authUser(data);
        }
        catch(error){
            console.log(error.message)
            msgText = error.response?.data?.error || error.response?.data?.message || "Ocorreu um erro inesperado" ; // Tratamento robusto
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }
    function logout(){
        localStorage.removeItem('token')
        setAuthenticated(false)
        navigate('/login');
        
        setFlashMessage("Você foi deslogado com sucesso", "success")
        api.defaults.headers.Authorization = undefined
    }
    
    return {authenticated, register, logout, login}
}

