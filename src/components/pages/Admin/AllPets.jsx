
import { useEffect, useState } from "react";
import styles from "../Pets/Dashboard.module.css"
import api from "../../../utils/api";
import RoundedImages from "../../Layouts/RoundedImage";
import { Link } from "react-router-dom";


function AllPets() {
    const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (!token) {
      console.warn("token nao encontrado aaaaaaaaaaaaaaaaaaaaaaaa");
    }
    api
      .get("/users/checkuser", {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        setUser(response.data);
        // console.log(response.data);
      });
  }, [token]);
  useEffect(() => {
    api.get('/admin/pets', {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    }).then((response) => {
        setPets(response.data.pets)
        console.log(response.data.pets)
    })
  }, [])

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
    return (
        <section>
            {user.isAdmin ? (
                <>
                <div className={styles.petslist_header}>
                <h1>Todos os Pets Cadastrados</h1>
                
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
                          <>
                            
                            
        
                            <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                            <button
                              onClick={() => {
                                removePet(pet._id);
                              }}
                            >
                              Excluir
                            </button>
                          </>
                
                      </div>
                    </div>
                  ))}
                {pets.length === 0 && <p>Ainda não há pets cadastrados!</p>}
              </div>
              </>
                 
            ) : (
                <h1>Saia daqui!!!!!!!!!!!!</h1>
            )}
           
        </section>
    )
}

export default AllPets;