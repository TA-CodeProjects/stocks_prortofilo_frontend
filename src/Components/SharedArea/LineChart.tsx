import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend
);

interface LineChartProps {
  chartData: any;
}

function LineChart(props: LineChartProps): JSX.Element {
  let timeUnit:('day' | 'week' | 'month' );
 if (props.chartData?.labels?.length <= 7 ) {
      timeUnit = "day";
  } else if (props.chartData?.labels?.length <= 22 ) {
    timeUnit = "week";
  } else {
    timeUnit = "month";
  }
  console.log(timeUnit);
  return (
    <div className="chart-container">
      <Line
        data={props.chartData}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                tooltipFormat: "MM/DD/YYYY",
                unit: timeUnit,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: props.chartData.title,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
