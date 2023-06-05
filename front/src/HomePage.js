import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export class HomePage extends React.Component {
  render() {
    return (
      <div className="body">
        <div className="wallet">
          <div className="wallet-heder">
            <h1>Wallet</h1>
          </div>
          <Link to="/expense">
            <button className="expense-btn">הוצאה</button>
          </Link>
          <div className="income">
            <Link to="/income">
              <button className="income-btn">הכנסה</button>
            </Link>
          </div>
          <div className="summarry">
            <Link to="/summary">
              <button className="summarry-btn">סיכום</button>
            </Link>
          </div>
          <div className="register">
            <Link to="/register">
              <button className="register-btn">הרשמה</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
