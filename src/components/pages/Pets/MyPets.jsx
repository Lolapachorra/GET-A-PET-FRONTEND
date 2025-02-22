import api from "../../../utils/api";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";
import RoundedImages from "../../Layouts/RoundedImage";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
 
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate()
  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id) {
    let msgType = "success";
    let msgText = "Pet removido com sucesso";
    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);

        setPets(updatedPets);

        return response.data;
      })
      .catch((error) => {
        // console.log(error);
        msgText =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Ocorreu um erro inesperado";
        msgType = "error";
      });
    setFlashMessage(msgText, msgType);
  }

  async function concludeAdoption(id) {
    let msgType = "success";
    let msgText = "Adoção concluída com sucesso";
    
    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate('/')
       return  response.data;
         
        
      })
      .catch((error) => {
        console.log("token enviado:", token)
         console.log(error.message);
        msgText =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Ocorreu um erro"
          ;
        msgType = "error";
      });
    setFlashMessage(msgText, msgType);
  }

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets Cadastrados</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImages
                src={`${
                  pet.images[0]
                }`}
                alt={pet.name}
                width="75px"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(pet._id);
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}

                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há pets cadastrados!</p>}
      </div>
    </section>
  );
}

export default MyPets;
