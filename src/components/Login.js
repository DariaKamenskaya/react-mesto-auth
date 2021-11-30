import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
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
    // здесь обрабатываем вход в систему
  }


  render(){
    return(
      <div className="login">
        <Header nav={'/sign-in'} navStatus={'Регистрация'}/>
        <p className="login__welcome">
          Вход
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input id="email" name="email" type="email" placeholder="Email" className="login__input"
                 value={this.state.username} onChange={this.handleChange} />
          <input required id="password" name="password" type="password" placeholder="Пароль" className="login__input"
                 value={this.state.password} onChange={this.handleChange} />
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;