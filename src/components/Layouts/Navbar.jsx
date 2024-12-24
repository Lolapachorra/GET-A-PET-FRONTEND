import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import styles from "./Navbar.module.css";

/* Context */
import { Context } from "../../context/UserContext";
import { useContext } from "react";
const Navbar = () => {
  const { authenticated, logout } = useContext(Context);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo do get a pet" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
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