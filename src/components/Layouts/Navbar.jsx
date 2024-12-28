import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import styles from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";
/* Context */
import { Context } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
const Navbar = () => {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [token] = useState(localStorage.getItem("token") || "");
  const { authenticated, logout } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
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
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search)
  };
  function handlesearchSubmit(e){
    e.preventDefault();
    console.log(search)
    navigate(`/pets/search?search=${search}`);
    
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo do get a pet" />
        <h2>Get A Pet</h2>
      </div>
      <div className={styles.search_bar}>
        <form onSubmit={handlesearchSubmit}>
          <input
            type="text"
            placeholder="Buscar por nome..."
            onChange={handleSearchChange}
            maxLength={50}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
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
