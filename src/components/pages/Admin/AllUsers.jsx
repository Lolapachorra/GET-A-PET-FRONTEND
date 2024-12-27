import { useEffect, useState } from "react";
import styles from "../Pets/Dashboard.module.css";
import api from "../../../utils/api";
import RoundedImages from "../../Layouts/RoundedImage";
import { Link } from "react-router-dom";

function AllUsers() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [users, setUsers] = useState([]);
  const [user,setUser] = useState({})

  useEffect(() => {
    if (!token) {
      //console.warn("Sem Token")
      return;
    }
    api
      .get("/users/checkuser", {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        setUser(response.data);
        //console.log("Check User Response:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao verificar usuário", error);
      });
  }, [token]);

  useEffect(() => {
    api
      .get("/admin/users", {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários", error);
      });
  }, [token]);

  async function removeUser(id) {
    let msgType = "success";
    let msgText = "Usuário removido com sucesso";

    try {
      await api.delete(`/admin/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      });

      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      msgText =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Ocorreu um erro inesperado";
      msgType = "error";
    }

    // Certifique-se de que setFlashMessage está definido corretamente.
    if (typeof setFlashMessage === "function") {
      setFlashMessage(msgText, msgType);
    }
  }

  return (
    <section>
      {user.isAdmin ? (
        <>
        <div className={styles.petslist_header}>
        <h1>Todos os Usuários Cadastrados</h1>
      </div>

      <div className={styles.petslist_container}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className={styles.petlist_row}>
              <RoundedImages
                src={user.image || "default-image.png"}
                alt={user.name}
                width="75px"
              />
              <span className="bold">{user.name}</span>
              <div className={styles.actions}>
                <Link to={`/user/admin/edit/${user._id}`}>Editar</Link>
                <button
                  onClick={() => {
                    removeUser(user._id);
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Não há usuários cadastrados!</p>
        )}
      </div>
      </>
      ) : (
        <h1>Acesso Restrito</h1>
      )}
    </section>
  );
}

export default AllUsers;
