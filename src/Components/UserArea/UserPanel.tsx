import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { UserStockModel } from "../../Models/UserStockModel";
import store from "../../Redux/store";
import { userStocksDownloaded } from "../../Redux/UserStockAppState";
import notify, { SccMsg } from "../../Services/Notification";
import { getStocks } from "../../WebApi/UserApi";
import { totalPortfolio, totalProfit } from "../SharedArea/Utils";
import StockCard from "./StockCard";

function UserPanel(): JSX.Element {
  const [userStocks, setUserStocks] = useState<UserStockModel[]>(
    store.getState().userStockState.userStocks
  );

  // define the subscription callback
  const subscriptionCallback = () => {
    console.log("The store state has changed:", store.getState());
  };

  // subscribe to changes in the store
  store.subscribe(subscriptionCallback);

  useEffect(() => {
    if (userStocks.length === 0) {
      getStocks()
        .then((res) => {
          notify.success(SccMsg.GOT_STOCKS);
          setUserStocks(res.data);
          store.dispatch(userStocksDownloaded(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  console.log(userStocks);

  return (
    <div className="mt-4">
      <h5>My portfolio:</h5>
      <h1>
        <span>{totalPortfolio(userStocks)}</span>
      </h1>
      <h5>Profit:</h5>
      <h5>
       {totalProfit(userStocks)}
      </h5>
      <Row gap={4} className="my-4 float-start">
        {userStocks.map((userStock) => (
          <StockCard userStock={userStock} />
        ))}
      </Row>
    </div>
  );
}

export default UserPanel;
