import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from '../pages/Home.module.css';
import { Link } from "react-router-dom";
const SearchResults = () => {
  const [pets, setPets] = useState([]);
  const [petsQty, setPetsQty] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search");
    if (!search) {
      console.error("Parâmetro de busca não encontrado");
      return;
    }

    setSearchTerm(search);

    axios
      .get(`${import.meta.env.VITE_URL_API}/pets/search?search=${encodeURIComponent(search)}`)
      .then((response) => {
        setPets(response.data.pets);
        setPetsQty(response.data.petsQty)

      })
      .catch((error) => {
        console.error("Erro ao buscar pets:", error.response?.data || error.message);
      });
  }, [location.search]);

  return (
    <div>
      <h1>Resultados da Busca: "{searchTerm}"</h1>
      <h2>Pets encontrados com esse termo: <span className={styles.search_span}>{petsQty}</span></h2>
       <div className={styles.pet_container}>
        {pets.length > 0 ? (
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
          ))) : (
            <p>Nenhum pet encontrado para a palavra-chave "{searchTerm}"</p>
          )}
    </div>
    </div>
  );
};

export default SearchResults;
