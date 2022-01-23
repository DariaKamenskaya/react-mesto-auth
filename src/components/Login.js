import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import * as auth from '../components/auth';


export default function Login({ onLogin }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          setValues({
            email: "",
            password: "",
          })
          localStorage.setItem('jwt', res.token);
          //onLogin();  // обновляем стейт внутри App.js
          navigate("/logged");  // и переадресуем пользователя! 
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
        <Header nav={'/sign-up'} navStatus={'Регистрация'}/>
        <p className="login__welcome">
          Вход
        </p>
        <form onSubmit={handleSubmit} className="login__form">
          <input id="email" name="email" type="email" placeholder="Email" className="login__input"
                 value={values.username} onChange={handleChange} />
          <input required id="password" name="password" type="password" placeholder="Пароль" className="login__input"
                 value={values.password} onChange={handleChange} />
          <div className="login__button-container">
            <button type="submit" className="login__link" onSubmit={handleSubmit}>Войти</button>
          </div>
        </form>
      </div>
  )
}









// class Login extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       email: '',
//       password: ''
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);

//   }
//   handleChange(e) {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }
//   handleSubmit(e){
//     e.preventDefault();
//     // здесь обрабатываем вход в систему
//     if (!this.state.username || !this.state.password){
//       return;
//     }
//     auth.authorize(this.state.email, this.state.password)
//     .then((data) => {
//        if (data.jwt) {
//         this.setState({
//           email: '',
//           password: ''
//         }, () => {
//           this.props.handleLogin(); // обновляем стейт внутри App.js
//           this.props.history.push('/logged'); // и переадресуем пользователя! 
//         })
//       }
//     })
//     .catch(err => console.log(err));
//   }


//   render(){
//     return(
//       <div className="login">
//         <Header nav={'/sign-in'} navStatus={'Регистрация'}/>
//         <p className="login__welcome">
//           Вход
//         </p>
//         <form onSubmit={this.handleSubmit} className="login__form">
//           <input id="email" name="email" type="email" placeholder="Email" className="login__input"
//                  value={this.state.username} onChange={this.handleChange} />
//           <input required id="password" name="password" type="password" placeholder="Пароль" className="login__input"
//                  value={this.state.password} onChange={this.handleChange} />
//           <div className="login__button-container">
//             <button type="submit" className="login__link">Войти</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

// export default Login;