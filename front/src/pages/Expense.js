import React from 'react';
import './expense.css';
import { BackendApi } from '../BackendApi';
export class Expense extends React.Component {
  api = null;

  state = {
    name: String,
    date: Date,
    price: Number,
    message: String,
    PaymentMethod: 'אשראי' || 'מזומן' || 'דירקט',
  };

  constructor(props) {
    super(props);
    this.api = new BackendApi();
    if (props.editItem) {
      this.state = {
        name: props.editItem.name,
        date: props.editItem.date,
        price: props.editItem.price,
        message: props.editItem.message,
        paymentMethod: props.editItem.paymentMethod,
        _id: props.editItem._id,
      };
    } else {
      this.state = {
        name: '',
        date: new Date(),
        price: 0,
        message: '',
        paymentMethod: 'אשראי',
      };
    }
  }

  submit = async (e) => {
    e.preventDefault();
    await this.api
      .post('/expense', {
        name: this.state.name,
        date: this.state.date,
        price: Number(this.state.price),
        paymentMethod: this.state.paymentMethod,
        message: this.state.message,
        _id: this.state._id || null,
      })
      .then((res) => {
        if (this.props.onSave) {
          this.props.onSave();
        } else {
          this.setState({
            name: '',
            date: new Date(),
            price: 0,
            paymentMethod: 'אשראי',
            message: '',
          });
        }
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
          min={0}
          value={this.state.price}
          onChange={(e) => this.setState({ price: e.target.value })}
        />
        <label htmlFor="paymentMethod">אמצעי תשלום</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={this.state.paymentMethod}
          onChange={(e) => this.setState({ paymentMethod: e.target.value })}
        >
          <option value="אשראי">אשראי</option>
          <option value="דירקט">דירקט</option>
          <option value="מזומן">מזומן</option>
        </select>
        <label htmlFor="message">הערות:</label>
        <textarea
          id="message"
          name="message"
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
        ></textarea>
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
