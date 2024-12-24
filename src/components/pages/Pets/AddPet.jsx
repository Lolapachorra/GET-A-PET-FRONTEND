import styles from './AddPet.module.css';
import api from '../../../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../../form/PetForm';
// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

function AddPet() {
  const [token, setToken] = useState(null);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  async function registerPet(pet) {
    let msgType = 'success';
    let msgText = 'Pet cadastrado com sucesso';
    const formData = new FormData();

    // Adicionando os dados do pet ao formData
    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    try {
      const response = await api.post('/pets/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setFlashMessage(msgText, msgType);
      navigate('/');
    } catch (error) {
      console.error(error);
      msgType = 'error';
      msgText =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Ocorreu um erro inesperado';
      setFlashMessage(msgText, msgType);
    }
  }

  if (token === null) {
    return <p>Carregando...</p>; // Enquanto verifica o token
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      {token ? (
        <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
      ) : (
        <p>Você precisa estar logado para cadastrar um pet</p>
      )}
    </section>
  );
}

export default AddPet;