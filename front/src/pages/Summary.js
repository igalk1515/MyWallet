import React from 'react';
import './summary.css';
import { BackendApi } from '../BackendApi';
import { PieChart } from '../charts/PieChart';
import { SummaryTable } from '../tables/SummaryTable';
import { Expense } from './Expense';
import xIcon from '../images/close.png';

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
    isReady: false,
    isOverlay: false,
    editItem: null,
  };
  constructor(props) {
    super(props);
    this.api = new BackendApi();
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async editExpense(item) {
    this.setState({ isOverlay: true, editItem: item });
  }

  async fetchData() {
    const data = await this.api.getSummary(new Date().getMonth() + 1);
    const mapExpenses = new Map();
    data?.documents?.forEach((item) => {
      if (mapExpenses.has(item.name)) {
        mapExpenses.set(item.name, mapExpenses.get(item.name) + item.price);
      } else {
        mapExpenses.set(item.name, item.price);
      }
    });
    this.setState({ data, isReady: true, mapExpenses });
  }

  render() {
    const h2Message =
      this.state?.data?.total > 0 ? 'סה"כ הוצאות לחודש ' : 'אין הוצאות לחודש ';
    const mapNames = this.state.mapExpenses;
    return (
      <div className="expense-form">
        <h1>סיכום</h1>
        <div className="Table-summary">
          <h2 className="total">
            {h2Message + this.month[new Date().getMonth()]}:{' '}
            {this.state?.data?.total}
          </h2>
        </div>
        {!this.state.showLabel && mapNames?.size > 0 && (
          <div className="pie-chart">
            <PieChart
              mapNames={mapNames}
              handleSliceClick={(event, label) => {
                this.setState({ showLabel: label });
              }}
            />
          </div>
        )}
        {this.state.isOverlay && (
          <div className="overlay">
            <div className="overlay-content">
              <button
                className="x-btn"
                onClick={() => this.setState({ isOverlay: false })}
              >
                <img src={xIcon} alt="x" />
              </button>
              <Expense
                editItem={this.state.editItem}
                closeOverlay={() => {
                  this.setState({ isOverlay: false, editItem: null });
                }}
                onSave={async () => {
                  this.setState({ isOverlay: false, editItem: null });
                  await this.fetchData();
                }}
              />
            </div>
          </div>
        )}

        {this.state.isReady ? (
          <SummaryTable
            expenses={this.state?.data?.documents}
            editExpense={this.editExpense.bind(this)}
          />
        ) : (
          <div className="lds-circle">
            <div></div>
          </div>
        )}
      </div>
    );
  }
}
