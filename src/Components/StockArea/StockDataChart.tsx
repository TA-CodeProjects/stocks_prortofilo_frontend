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
          label: props.stockData?.stockName,
          data: props.stockData?.days
            ?.map((day) => day.price)
            .reverse()
            .slice(props.slice),
          backgroundColor: ["rgba(0,0,0,1)"],
          borderColor: "white",
          borderWidth: 2,
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