import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'
import { useParams } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";


function EditPet(){
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem("token") || "");
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
 
    useEffect(() => {
           
           api.get(`/pets/${id}`, {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
       .then((response) => {
        
         setPet(response.data.pet);
         console.log(response.data)
         
        
       }).catch((err) => {
        console.log(err)
       })
    }, [token, id]);
    
    const updatePet = async (pet) => {
        let msgType = "success"
        let msgText = "Pet atualizado com sucesso"
        const formData = new FormData();

        Object.keys(pet).forEach((key) => {
          if(key === 'images'){
              for(let i = 0; i < pet[key].length; i++){
                formData.append('images', pet[key][i]);
              }
          }
          else{
            formData.append(key, pet[key]);
          }

        })
           const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': "multipart/form-data"
            }
           }).then((result) => {
             return result.data;
           }).catch((error) => {
            msgText =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Ocorreu um erro inesperado";
            msgType = "error";
            console.log(error)
            return;
            
           })
            setFlashMessage(msgText, msgType)
    }
    return(
        <section>
         <div className={styles.addpet_header}>
            <h1>
         {pet.name ? `Editando o Pet: ${pet.name}` : "Carregando..."}
         </h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>

         </div>
         {pet.name && (
            <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet}/>
         )}
        </section>
    )
}

export default EditPet