import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import styles from "./Navbar.module.css";

/* Context */
import { Context } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
const Navbar = () => {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem("token") || "")
  const { authenticated, logout } = useContext(Context);
  useEffect(() => {
    if(!token){
      //console.warn("token nao encotrado!!!")
      return;
    }
      api
        .get("/users/checkuser", {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          
           // console.log(response.data)
            setUser(response.data);

        });
    }, [token]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo do get a pet" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        {user.isAdmin && (
          <li>
            <Link to="/user/admin">Administração</Link>
          </li>
        )}
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
          <li>
            <Link to="/pet/myadoptions">Minhas Adoções</Link>
          </li>
          <li>
             <Link to="/user/mypets">Meus Pets</Link>
            </li>
             <li> 
              <Link to="/user/profile">Perfil</Link>
             </li>
             <li onClick={logout}>
              <a href="#">Sair</a>
             </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
