import React, { useState } from 'react';
import * as auth from '../components/auth';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import InfoTooltip from '../components/InfoTooltip';


export default function Register() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [infoPopup, setInfoPopup] = useState({
    isOpenLoginPopup: false,
    errorLogin: false,
    message: ''
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
    auth
        .register(
          values.email,
          values.password
        )
        .then((res) => {
          if(res.data){
            setInfoPopup({
              message: 'Успешно зарегестрировались',
              errorLogin: true,
              isOpenLoginPopup: false
            });
            openPopup();
          } else {
            setInfoPopup({
              message: 'Что-то пошло не так!',
              errorLogin: false,
              isOpenLoginPopup: false
            });
            openPopup();
          }
        });
  };

  const openPopup = () => {
    setInfoPopup((prevState) => ({
      ...prevState,
      isOpenLoginPopup: true,
    }));
  }

  const closePopup = () => {
    setInfoPopup((prevState) => ({
      ...prevState,
      isOpenLoginPopup: false,
    }));
    if (infoPopup.errorLogin) navigate("/sign-in");
  };

  return (
    <div className="register">
        <Header nav={'/sign-in'} navStatus={'Войти'}/>
        <h1 className="register__welcome">Регистрация</h1>
        <form onSubmit={handleSubmit} className="register__form">
          <input id="email" name="email" type="email" placeholder="Email" className="register__input"
                 value={values.email} onChange={handleChange} />
          <input id="password" name="password" type="password" placeholder="Пароль" className="register__input"
                 value={values.password} onChange={handleChange} />
            <div className="register__button-container">
              <button type="submit" className="register__link" onSubmit={handleSubmit}>Зарегистрироваться</button>
            </div>
        </form>
        <div className="register__signin">
          <p>Уже зарегестрировались?</p>
          <Link to="/sign-in" className="register__login-link">Войти</Link>
        </div>
        {(infoPopup.isOpenLoginPopup) && <InfoTooltip  errorLogin={infoPopup.errorLogin} onClosePopup={closePopup}/> }
        {/* <InfoTooltip isOpen={infoPopup.isOpenLoginPopup} errorLogin={infoPopup.errorLogin} onClosePopup={closePopup}/> 
         (this.state.errorLogin && this.state.isOpenLoginPopup) &&
             <Navigate to="/sign-up" replace={true} /> 
        */}
      </div>
  );
}



// class Register extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       isOpenLoginPopup: false,
//       errorLogin: null,
//       message: ''
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
//       auth.register(this.state.password, this.state.email).then((res) => {
//         if(res.token){
//           this.setState({
//             message: 'Успешно зарегестрировались',
//             errorLogin: true
//           });
//           this.openPopup();
//         } else {
//           this.setState({
//             message: 'Что-то пошло не так!',
//             errorLogin: false
//           });
//           this.openPopup();
//         }
//       });
//   }

//   openPopup = () => {
//     this.setState({isOpenLoginPopup: true});
//   }

//   closePopup = () => {
//     this.setState({ isOpenLoginPopup: false });
//   };

//   render(){
//     return(
//       <div className="register">
//         <Header nav={'/sign-in'} navStatus={'Войти'}/>
//         <h1 className="register__welcome">Регистрация</h1>
//         <form onSubmit={this.handleSubmit} className="register__form">
//           <input id="email" name="email" type="email" placeholder="Email" className="register__input"
//                  value={this.state.email} onChange={this.handleChange} />
//           <input id="password" name="password" type="password" placeholder="Пароль" className="register__input"
//                  value={this.state.password} onChange={this.handleChange} />
//             <div className="register__button-container">
//               <button type="submit" className="register__link">Зарегистрироваться</button>
//             </div>
//         </form>
//         <div className="register__signin">
//           <p>Уже зарегестрировались?</p>
//           <Link to="sign-up" className="register__login-link">Войти</Link>
//         </div>
//         <InfoTooltip isOpen={this.state.isOpenLoginPopup} errorLogin={this.state.errorLogin} onClosePopup={this.closePopup}/> 
//         {/* (this.state.errorLogin && this.state.isOpenLoginPopup) &&
//              <Navigate to="/sign-up" replace={true} /> 
//         */}
//       </div>
//     )
//   }
// }

// export default Register; 