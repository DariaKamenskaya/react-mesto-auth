import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }
  handleSubmit(e){
        e.preventDefault()
    if (this.state.password === this.state.confirmPassword){
      // сюда добавим логику обработки формы регистрации
    }
  }
  render(){
    return(
      <div className="register">
        <Header/>
        <p className="register__welcome">
          Регистрация
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <input id="email" name="email" type="email" placeholder="Email"
                 value={this.state.email} onChange={this.handleChange} />
          <input id="password" name="password" type="password" placeholder="Пароль"
                 value={this.state.password} onChange={this.handleChange} />
          <input id="confirmPassword" name="confirmPassword" type="password" 
                 value={this.state.confirmPassword} onChange={this.handleChange} />
            <div className="register__button-container">
              <button type="submit" className="register__link">Зарегистрироваться</button>
            </div>
        </form>
        <div className="register__signin">
          <p>Уже зарегестрировались?</p>
          <Link to="login" className="register__login-link">Войти</Link>
        </div>
      </div>
    )
  }
}

export default Register; 