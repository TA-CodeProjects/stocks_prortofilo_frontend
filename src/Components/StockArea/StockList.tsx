import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { GraphUp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { StockPerformanceModel } from "../../Models/StockPerformanceModel";
import { stockPerformanceDownloadedAction } from "../../Redux/StockAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { getStocksPerformance } from "../../WebApi/StockApi";
import PercentageChange from "../SharedArea/PercentageChange";

function StockList(): JSX.Element {
  const [stocks, setStocks] = useState<StockPerformanceModel[]>(store.getState().stockState.stocksPerformance);

  useEffect(() => {
    if (stocks.length === 0) {
      getStocksPerformance()
        .then((res) => {
          notify.success(SccMsg.GOT_STOCKS);
          setStocks(res.data);
          store.dispatch(stockPerformanceDownloadedAction(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  return (
    <div className="stockList">
      <h2>Stocks List</h2>
      <Table bordered hover>
        <thead>
          <th>Stock Name</th>
          <th>Price</th>
          <th>Last day</th>
          <th>Last 7 day</th>
          <th>Last 30 day</th>
          <th>Last 90 day</th>
          <th></th>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.stockName}>
              <td>{stock.stockName}</td>
              <td>{stock.day0.price}</td>
              <PercentageChange from={stock.day0.price} to={stock.day1.price} />
              <PercentageChange from={stock.day0.price} to={stock.day5.price} />
              <PercentageChange from={stock.day0.price} to={stock.day22.price} />
              <PercentageChange from={stock.day0.price} to={stock.day66.price} />
              <Link to={`/stockData/${stock.stockName}`}>
              <Button variant="primary">
                 <GraphUp size={18}/>
              </Button>
              </Link>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StockList;
