import React from 'react';
import { BackendApi } from '../BackendApi';
import Cookies from 'js-cookie';
import './register.css';
export class Register extends React.Component {
  registerState = {
    userName: '',
    password: '',
  };
  constructor(props) {
    super(props);
    this.api = new BackendApi();
    this.state = {
      userName: '',
      password: '',
    };
  }
  componentDidMount() {}
  async register() {
    await this.api
      .post('/register', {
        userName: this.state.userName,
        password: this.state.password,
      })
      .then((res) => {
        Cookies.set('jwt', res.token, { expires: 7 });
        window.location.href = '/';
      })
      .catch((err) => {});
  }

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <div className="register-form">
          <input
            type="text"
            placeholder="user name"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button onClick={() => this.register()}>Register</button>
        </div>
      </div>
    );
  }
}
