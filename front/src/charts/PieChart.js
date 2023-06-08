import React from 'react';
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Title, Legend);

export class PieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  handleSliceClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      const { index } = chartElements[0];
      const label = this.data.labels[index];
      console.log(label);
      this.props.handleSliceClick(event, label);
    }
  };

  render() {
    const mapNames = this.props.mapNames || new Map();
    const keys = Array.from(mapNames.keys());
    const values = Array.from(mapNames.values());

    const colors = Array.from({ length: mapNames.size }, () =>
      this.getRandomColor()
    );

    this.data = {
      labels: keys,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };

    const options = {
      onClick: this.handleSliceClick,
    };

    return (
      <div>
        <Pie data={this.data} options={options} />
      </div>
    );
  }
}
