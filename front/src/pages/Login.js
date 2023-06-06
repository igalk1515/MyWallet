import React from 'react';
import { BackendApi } from '../BackendApi';
import Cookies from 'js-cookie';
export class Login extends React.Component {
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
  async login() {
    await this.api
      .get('/login', {
        userName: this.state.userName,
        password: this.state.password,
      })
      .then((res) => {
        Cookies.set('jwt', res.token, { expires: 7 });
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <div className="login-form">
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
          <button onClick={() => this.login()}>התחבר</button>
        </div>
      </div>
    );
  }
}
