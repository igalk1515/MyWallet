import React from 'react';
import './summary.css';
import { BackendApi } from '../BackendApi';
import { PieChart } from '../charts/PieChart';
import { SummaryTable } from '../tables/SummaryTable';

export class Summary extends React.Component {
  month = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ];
  state = {
    data: null,
    showLabel: null,
    isReady: null,
  };
  constructor(props) {
    super(props);
    this.api = new BackendApi();
  }

  async componentDidMount() {
    const data = await this.api.getSummary('6');
    this.setState({ data, isReady: true });
    this.forceUpdate();
  }
  render() {
    console.log('this.state.isReady', this.state.isReady);
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
          <h2 className="total">
            סה"כ הוצאות לחודש {this.month[new Date().getMonth()]}:{' '}
            {this.state?.data?.total}
          </h2>
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
        {this.state.isReady ? (
          <SummaryTable expenses={this.state?.data?.documents} />
        ) : (
          <div class="lds-circle">
            <div></div>
          </div>
        )}
      </div>
    );
  }
}
