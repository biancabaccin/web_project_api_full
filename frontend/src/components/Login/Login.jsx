import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(formData.email, formData.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      <h1 className="login__title">Entrar</h1>

      <form className="login__fildset" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          required
        />
        <input
          className="login__input"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          minLength={8}
          required
        />

        <button className="login__submit-button" type="submit">
          Entrar
        </button>

        <Link to="/signup" className="login__register-button">
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </form>
    </div>
  );
}

export default Login;
