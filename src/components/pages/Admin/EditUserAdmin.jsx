import api from "../../../utils/api";

import styles from "../User/Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import RoundedImages from "../../Layouts/RoundedImage";
import { useParams } from "react-router-dom";
function EditUserAdmin() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const {id} = useParams()
  const [editedUser, setEditedUser] = useState()
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        
        setUser(response.data);
        
      });
  }, [token]);

  useEffect(() => {
    api.get(`/users/${id}`).then((response) => {
        setEditedUser(response.data.user)
       // console.log(response.data.user)
    })
  }, [id])
  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setEditedUser({ ...editedUser, image: e.target.files[0] });
   // console.log(editedUser);
  }
  function handleChange(e) {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
   // console.log(editedUser);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "success";
    let msgText = "Perfil atualizado com sucesso"; // Declarar msgText antes do try/catch

    const formData = new FormData();
    Object.keys(editedUser).forEach((keys) => formData.append(keys, editedUser[keys]));

    const data = await api
      .patch(`admin/users/edit/${editedUser._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        msgText =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Ocorreu um erro inesperado";
        msgType = "error";
      });

    setFlashMessage(msgText, msgType); // Usar msgText declarado no escopo externo
  }

  if(!editedUser){
    return <p>Carregando...</p> // Enquanto verifica os dados do usuário
  }
  return (
    <section>
     {user.isAdmin ? (
        <>
         <div className={styles.profile_header}>
         <h1>Perfil</h1>
         {(editedUser.image || preview) && (
           <RoundedImages
             src={
               preview
                 ? URL.createObjectURL(preview)
                 : `${editedUser.image}`
             }
             alt={`Foto do ${editedUser.name}`}
           />
         )}
       </div>
       <form className={formStyles.form_container} onSubmit={handleSubmit}>
         <Input
           text="Imagem"
           type="file"
           name="image"
           handleOnChange={onFileChange}
         />
         <Input
           text="Email"
           type="email"
           name="email"
           placeholder="Digite o seu Email"
           value={editedUser.email || ""}
           handleOnChange={handleChange}
         />
         <Input
           text="Nome"
           type="text"
           name="name"
           placeholder="Digite o seu Nome"
           value={editedUser.name || ""}
           handleOnChange={handleChange}
           maxLength={100}
         />
         <Input
           text="Telefone"
           type="text"
           name="phone"
           placeholder="Digite o seu Telefone"
           value={editedUser.phone || ""}
           handleOnChange={handleChange}
         />
         <Input
           text="Senha"
           type="password"
           name="password"
           placeholder="Digite a sua Senha(caso deseje alterá-la)"
           handleOnChange={handleChange}
         />
         <Input
           text="Confirme sua senha"
           type="password"
           name="confirmPassword"
           placeholder="Confirme a sua Senha alterada"
           handleOnChange={handleChange}
         />
         <input type="submit" value="Editar" />
       </form>
       </>
     ) : (
        <p>Você não possui permissão para acessar este conteúdo.</p>
 
     )}
    </section>
  );
}

export default EditUserAdmin;
