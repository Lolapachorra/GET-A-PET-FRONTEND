import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";
const Register = () => {
  const [submitButton, setSubmitButton] = useState(false)
  //create userState
  const [user, setUser] = useState({});
  const {register} = useContext(Context)
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
 async function handleSubmit(e) {
    e.preventDefault();
     //settimeout
    setSubmitButton(true)
    
   
    //Send user to backend
   // console.log(user);
   await register(user)

   setSubmitButton(false)

    
  }
  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
          maxLength={100}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="exemplo: 21 980999181"
          handleOnChange={handleChange}
          
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
          
        />
        <Input
          text="Confirmar senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          handleOnChange={handleChange}
          
        />
        <input type="submit" disabled={submitButton} value="Cadastrar" />
      </form>
      <p>
        Já tem conta?{" "}
        <span>
          <Link to="/login">Clique Aqui</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
