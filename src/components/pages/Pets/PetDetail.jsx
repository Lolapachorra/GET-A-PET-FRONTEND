import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './PetDetail.module.css';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {

      })
      .then((response) => {
       
          setPet(response.data.pet);
        
      })
      .catch((error) => {
        console.log(error.message)
        console.error('Erro ao buscar detalhes do pet:', error);
      });
  }, [id, token]);

  async function schedule() {
    let msgType = 'success';
    let msgText = 'Solicitação de visita realizada com sucesso';

    await api
      .patch(
        `pets/schedule/${pet._id}`,
        {}, // Corpo vazio
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        navigate('/pet/myadoptions')
        console.log(response.data);
      })
      .catch((error) => {
        msgText =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Ocorreu um erro inesperado';
        msgType = 'error';
      });

    setFlashMessage(msgText, msgType);
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${image}`}
                alt={pet.name}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default PetDetails;


















































/*
function PetDetails() {
  const [pet, setPet] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  }, [id])

  async function schedule(){
    let msgType = "success"
    let msgText = "Solicitação de visita realizada com sucesso"
    const data = await api.patch(`pets/schedule/${pet._id}`, 
        {headers: {'Authorization': `Bearer ${token}`}}
    ).then((response) => {
        console.log(response.data)
        return response.data;
    }).catch((error) => {
        // console.log(error);
        msgText =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Ocorreu um erro inesperado";
        msgType = "error";
  
    })
    setFlashMessage(msgText, msgType)
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_URL_API}/images/pets/${image}`}
                alt={pet.name}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails
*/