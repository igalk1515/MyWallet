import React from 'react';
import './summary.css';
import { BackendApi } from '../BackendApi';
import { PieChart } from '../charts/PieChart';
import { SummaryTable } from '../tables/SummaryTable';

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
    this.forceUpdate();
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
        <SummaryTable expenses={this.state?.data?.documents} />
      </div>
    );
  }
}
