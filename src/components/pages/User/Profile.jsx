import api from "../../../utils/api";

import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import RoundedImages from "../../Layouts/RoundedImage";
function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
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

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, image: e.target.files[0] });
    console.log(user);
  }
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "success";
    let msgText = "Perfil atualizado com sucesso"; // Declarar msgText antes do try/catch

    const formData = new FormData();
    Object.keys(user).forEach((keys) => formData.append(keys, user[keys]));

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
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
  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <RoundedImages
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${user.image}`
            }
            alt={`Foto do ${user.name}`}
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
          value={user.email || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu Nome"
          value={user.name || ""}
          handleOnChange={handleChange}
          maxLength={100}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu Telefone"
          value={user.phone || ""}
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
    </section>
  );
}

export default Profile;
