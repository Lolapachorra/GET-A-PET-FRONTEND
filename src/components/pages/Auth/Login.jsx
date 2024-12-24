import { useState, useContext } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";
import styles from "../../form/Form.module.css";
//context
import { Context } from "../../../context/UserContext";

const Login = () => {
  const [submitButton, setSubmitButton] = useState(false)
  const [user,setUser] = useState({})
  const {login} = useContext(Context)
  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value });
    //console.log(user)
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitButton(true)
    //Send user to backend
   await login(user)
    setSubmitButton(false)
  }
  return (
    <section className={styles.form_container}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite o seu Email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua Senha"
          handleOnChange={handleChange}
        />
        <input type="submit" disabled={submitButton} value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link to='/register'>Clique Aqui!</Link>
      </p>
    </section>
  );
};

export default Login;
