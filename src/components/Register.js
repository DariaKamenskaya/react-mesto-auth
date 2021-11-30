import React from 'react';
import * as auth from '../components/auth';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
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
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword){
      auth.register(this.state.username, this.state.password, this.state.email).then((res) => {
        if(res){
          this.setState({
            message: ''
          }, () => {
            this.props.history.push('/login');
          })
        } else {
          this.setState({
            message: 'Что-то пошло не так!'
          })
        }
      });
    }
  }

  render(){
    return(
      <div className="register">
        <Header nav={'/sign-in'} navStatus={'Войти'}/>
        <h1 className="register__welcome">Регистрация</h1>
        <form onSubmit={this.handleSubmit} className="register__form">
          <input id="email" name="email" type="email" placeholder="Email" className="register__input"
                 value={this.state.email} onChange={this.handleChange} />
          <input id="password" name="password" type="password" placeholder="Пароль" className="register__input"
                 value={this.state.password} onChange={this.handleChange} />
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