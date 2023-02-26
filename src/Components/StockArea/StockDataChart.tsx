import { StockDataModel } from "../../Models/StockDataModel";
import LineChart from "../SharedArea/LineChart";

interface ChartProps {
    stockData: StockDataModel;
    slice: number;
}

function StockDataChart(props: ChartProps): JSX.Element{
    const data = {
      labels: props.stockData?.days
        ?.map((day) => new Date(day.day))
        .reverse()
        .slice(props.slice),
      title: props.stockData?.stockName,
      datasets: [
        {
          label: "Price",
          data: props.stockData?.days
            ?.map((day) => day.price)
            .reverse()
            .slice(props.slice),
          backgroundColor: "rgba(0,0,0,1)",
          borderColor: "white",
          borderWidth: 2,
        },
        {
          label: "sma60",
          data: props.stockData?.days
            ?.map((day) => day.sma)
            .reverse()
            .slice(props.slice),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    };


    return (
        <div className="chart-data">
            <LineChart chartData={data} />
        </div>
    )
}

export default StockDataChart;