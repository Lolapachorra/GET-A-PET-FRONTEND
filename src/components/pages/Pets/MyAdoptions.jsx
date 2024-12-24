import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import api from "../../../utils/api";
import RoundedImages from "../../Layouts/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        setPets(response.data.adoptedPets || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar adoções:", error);
        setPets([]);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImages
                src={`${pet.images[0]}`}
                alt={pet.name}
                width="75px"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Você não possui adoções até o momento</p>
        )}
      </div>
    </section>
  );
}

export default MyAdoptions;























































/*
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css"
import api from "../../../utils/api";
import RoundedImages from "../../Layouts/RoundedImage";

function MyAdoptions() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem("token") || "")

     useEffect(() => {
        
        api.get('/pets/myadoptions', {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        }).then((response) => {
           // console.log(response.data.pets)  // Para depuração 
            setPets(response.data.adoptedPets || [])
        })
     }, [token])
     return(
          <section>
            <div className={styles.petlist_header}>
                <h1>Minhas Adoções</h1>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 && 
                pets.map((pet) => (
                    <div key={pet._id} className={styles.petlist_row}>
                    <RoundedImages
                      src={`${import.meta.env.VITE_URL_API}/images/pets/${
                        pet.images[0]
                      }`}
                      alt={pet.name}
                      width="75px"
                    />
                    <span className="bold">{pet.name}</span>
                    <div className={styles.contacts}>
                        <p>
                            <span className="bold">Ligue para:</span> {pet.user.phone}
                        </p>
                        <p>
                            <span className="bold">Fale com:</span> {pet.user.name}
                        </p>
                    </div>
                    <div className={styles.actions}>
                      {pet.available ? (
                       <p>Adoção em processo</p>
                      ) : (
                        <p>Parabéns por concluir a adoção</p>
                      )}
                    </div>
                  </div>
                ))
                }
                {pets.length === 0 && <p>Você não possui adoções até o momento</p>}
            </div>
          </section>
     )
}

export default MyAdoptions;
*/