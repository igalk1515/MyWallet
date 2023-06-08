import React from 'react';
import './summary.css';
import { BackendApi } from '../BackendApi';
import { PieChart } from '../charts/PieChart';

export class Summary extends React.Component {
  state = {
    data: null,
    showLabel: null,
  };
  constructor(props) {
    super(props);
    this.api = new BackendApi();
  }

  async componentDidMount() {
    const data = await this.api.getSummary('6');
    this.setState({ data });
  }
  render() {
    const mapNames = new Map();
    this.state?.data?.documents?.forEach((item) => {
      if (mapNames.has(item.name)) {
        mapNames.set(item.name, mapNames.get(item.name) + item.price);
      } else {
        mapNames.set(item.name, item.price);
      }
    });

    return (
      <div className="expense-form">
        <h1>סיכום</h1>
        <div className="Table-summary">
          <h2 className="total">סה"כ הוצאות: {this.state?.data?.total}</h2>
        </div>
        {!this.state.showLabel && mapNames.size > 0 && (
          <div className="pie-chart">
            <PieChart
              mapNames={mapNames}
              handleSliceClick={(event, label) => {
                this.setState({ showLabel: label });
              }}
            />
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>תאריך</th>
              <th>סוג</th>
              <th>מחיר</th>
              <th>סוג תשלום</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {this.state?.data?.documents?.map((item, index) => (
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
      </div>
    );
  }
}
