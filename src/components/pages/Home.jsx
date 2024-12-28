import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import api from "../../utils/api";
const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);
 
  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.pet_card}>
              <div
             
                style={{
                  backgroundImage: `url(${pet.images[0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso: {pet.weight}kg</span>
              </p>
              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado</p>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Não há nenhum pet cadastrado</p>}
      </div>
    </section>
  );
};

export default Home;
