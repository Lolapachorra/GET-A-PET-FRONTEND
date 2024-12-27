import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import styles from './AdminPage.module.css'
function Admin() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});

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
        //console.log(response.data);
      });
  }, [token]);

  return (
    <section>
      {user.isAdmin ? (
        <div>
          <h1>Administração</h1>

          <ul className={styles.admin_tools}>
            <li>
              <Link to="/user/admin/allpets">Gerenciar Pets</Link>
            </li>
            <li>
              <Link to="/user/admin/allusers">Gerenciar Usuários</Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>Você não possui permissão para acessar essa página.</p>
      )}
    </section>
  );
}

export default Admin;
