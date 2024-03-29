import React from 'react';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import './summaryTable.css';

export class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.expenses,
      showLabel: null,
      direction: false,
      keySort: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.expenses !== prevProps.expenses) {
      this.setState({ data: this.props.expenses });
    }
  }

  sortTable(key) {
    if (this.state.keySort !== null && this.state.keySort === key) {
      this.setState({ direction: !this.state.direction });
    }
    this.setState({ keySort: key });
    const sortedData = this.props.expenses.sort((a, b) => {
      if (a[key] > b[key]) return 1;
      else if (a[key] < b[key]) return -1;
      else return 0;
    });
    if (this.state.direction) {
      sortedData.reverse();
    }
    this.setState({ data: sortedData });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => this.sortTable('date')}>תאריך</th>
            <th onClick={() => this.sortTable('name')}>סוג</th>
            <th onClick={() => this.sortTable('price')}>מחיר</th>
            <th onClick={() => this.sortTable('paymentMethod')}>סוג תשלום</th>
            <th onClick={() => this.sortTable('message')}>הערות</th>
          </tr>
        </thead>
        <tbody>
          {!this.props?.showLabel
            ? this.state.data?.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.date.split('T')[0]}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.paymentMethod}</td>
                  <td>{item.message}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        this.props.editExpense(item);
                      }}
                    >
                      <img src={editIcon} alt="edit" />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        this.props.deleteExpense(item);
                      }}
                    >
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))
            : this.state.data?.map(
                (item, index) =>
                  this.props.showLabel === item.name && (
                    <tr key={item._id}>
                      <td>{item.date.split('T')[0]}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{item.message}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            this.props.editExpense(item);
                          }}
                        >
                          <img src={editIcon} alt="edit" />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            this.props.deleteExpense(item);
                          }}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
    );
  }
}
