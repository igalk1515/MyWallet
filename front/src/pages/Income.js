import React from 'react';
import './expense.css';
import { BackendApi } from '../BackendApi';
export class Income extends React.Component {
  api = null;

  state = {
    name: String,
    date: Date,
    price: Number,
    message: String,
  };

  constructor(props) {
    super(props);
    this.api = new BackendApi();
    this.state = {
      name: '',
      date: new Date(),
      price: 0,
      message: '',
    };
  }

  submit = async (e) => {
    e.preventDefault();
    await this.api
      .post('/income', {
        name: this.state.name,
        date: this.state.date,
        price: Number(this.state.price),
        message: this.state.message,
      })
      .then((res) => {
        this.setState({
          name: '',
          date: new Date(),
          price: 0,
          message: '',
        });
      });
  };

  render() {
    return (
      <form className="expense-form" method="POST">
        <label htmlFor="name">כותרת</label>
        <input
          type="text"
          id="name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <label htmlFor="date">תאריך:</label>
        <input
          id="date"
          type="date"
          name="date"
          value={new Date(this.state.date).toISOString().split('T')[0]}
          onChange={(e) => this.setState({ date: e.target.value })}
        />
        <label htmlFor="price">מחיר</label>
        <input
          type="number"
          id="price"
          name="price"
          value={this.state.price}
          onChange={(e) => this.setState({ price: e.target.value })}
        />
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
