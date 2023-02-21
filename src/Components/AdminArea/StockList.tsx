import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { StockModel } from "../../Models/StockModel";
import { stocksDownloaded } from "../../Redux/StockAppState";
import store from "../../Redux/store";
import { useToken } from "../../Services/LoginHook";
import notify, { SccMsg } from "../../Services/Notification";
import { getStocks } from "../../WebApi/AdminApi";
import CustomLink from "../SharedArea/CustomLink";
import Stock from "./Stock";

function StockList(): JSX.Element {
  const [stocks, setStocks] = useState<StockModel[]>(store.getState().stockState.stocks);

  useToken();

  useEffect(() => {
    if (stocks.length === 0) {
      getStocks()
        .then((res) => {
          notify.success(SccMsg.GOT_STOCKS);
          setStocks(res.data);
          store.dispatch(stocksDownloaded(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  },[stocks]);

  return (
    <div className="table-style my-4">
      <h2>Stocks</h2>
      <ButtonGroup className="my-4">
        <Button variant="secondary">
          <CustomLink to="/admin">Back</CustomLink>
        </Button>
        <Button variant="primary">
          <CustomLink to="/admin/stock/add">Add Stock</CustomLink>
        </Button>
      </ButtonGroup>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <Stock key={stock.id} stock={stock} setStocks={setStocks} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StockList;
