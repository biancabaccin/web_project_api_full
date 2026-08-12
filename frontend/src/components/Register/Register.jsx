import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email: data.email, password: data.password });
  };

  return (
    <div className="register">
      <h2 className="register__title">Sign up</h2>

      <form className="register__fildset" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          name="email"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          minLength={8}
          required
        />

        <button className="register__submit-button" type="submit">
          Sign up
        </button>

        <Link to="/signin" className="register__sigin-button">
          Already a member? Log in!
        </Link>
      </form>
    </div>
  );
};

export default Register;
