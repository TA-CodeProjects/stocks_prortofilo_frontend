import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { GraphUp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { StockPerformanceModel } from "../../Models/StockPerformanceModel";
import { stockPerformanceDownloadedAction } from "../../Redux/StockPerformanceAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { getStocksPerformance } from "../../WebApi/StockApi";
import PercentageChange from "../SharedArea/PercentageChange";

function StockList(): JSX.Element {
  const [stocks, setStocks] = useState<StockPerformanceModel[]>(
    store.getState().stockPerformanceState.stocksPerformance
  );

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
          <tr>
            <th>Stock Name</th>
            <th>Price</th>
            <th>Last day</th>
            <th>Last 7 day</th>
            <th>Last 30 day</th>
            <th>Last 90 day</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.stockName}>
              <td>{stock.stockName}</td>
              <td>{stock.day0.price}</td>
              <td>
                <PercentageChange
                  from={stock.day0.price}
                  to={stock.day1.price}
                />
              </td>
              <td>
                <PercentageChange
                  from={stock.day0.price}
                  to={stock.day5.price}
                />
              </td>
              <td>
                <PercentageChange
                  from={stock.day0.price}
                  to={stock.day22.price}
                />
              </td>
              <td>
                <PercentageChange
                  from={stock.day0.price}
                  to={stock.day66.price}
                />
              </td>
              <td>
                <Link to={`/stockData/${stock.stockName}`}>
                  <Button variant="primary">
                    <GraphUp size={18} />
                  </Button>
                </Link>
              </td>
              <td>
                <Link
                  to={`/user/transaction/${stock.stockName}/${stock.day0.day}/${stock.day0.price}`}
                >
                  <Button variant="success">Buy</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StockList;
