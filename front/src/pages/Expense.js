import React from 'react';
import './expense.css';
import { BackendApi } from '../BackendApi';
export class Expense extends React.Component {
  api = null;

  expenseState = {
    name: '',
    date: new Date(),
    price: '',
    message: '',
  };

  constructor(props) {
    super(props);
    this.api = new BackendApi();
  }

  submit = async (e) => {
    e.preventDefault();
    console.log('submit');
    await this.api
      .post('/expense', {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        price: document.getElementById('price').value,
        message: document.getElementById('message').value,
      })
      .then((res) => {
        console.log('res');
      });
  };

  render() {
    return (
      <form className="expense-form" method="POST">
        <label htmlFor="name">כותרת</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="date">תאריך:</label>
        <input id="date" type="date" name="date" />
        <label htmlFor="price">מחיר</label>
        <input type="number" id="price" name="price" />
        <label htmlFor="message">הערות:</label>
        <textarea id="message" name="message"></textarea>
        <button
          type="submit"
          onClick={(e) => {
            this.submit(e);
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}
