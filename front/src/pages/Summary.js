import React from 'react';
import './summary.css';
import { BackendApi } from '../BackendApi';
export class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.api = new BackendApi();
  }

  async componentDidMount() {
    const data = await this.api.getSummary('6');
    this.setState({ data });
  }
  render() {
    return (
      <div className="expense-form">
        <h1>סיכום</h1>
        <div className="Table-summary">
          <h2 className="total">סה"כ הוצאות: {this.state?.data?.total}</h2>
          <table>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>סוג</th>
                <th>מחיר</th>
                <th>הערות</th>
              </tr>
            </thead>
            <tbody>
              {this.state?.data?.documents?.map((item, index) => (
                <tr key={index}>
                  <td>{item.date.split('T')[0]}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
