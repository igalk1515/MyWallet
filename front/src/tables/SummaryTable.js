import React from 'react';

export class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showLabel: null,
      direction: false,
      keySort: null,
    };
  }

  async componentDidMount() {
    this.setState({ data: this.props.expenses });
    this.forceUpdate();
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
    this.forceUpdate();
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
          {this.state.data?.map((item, index) => (
            <tr key={index}>
              <td>{item.date.split('T')[0]}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.paymentMethod}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
