import { useEffect, useState } from "react";
import { UserStockModel } from "../../Models/UserStockModel";
import store from "../../Redux/store";
import { getStocks } from "../../WebApi/UserApi";
import notify, { SccMsg } from "../../Services/Notification";
import { userStocksDownloaded } from "../../Redux/UserStockAppState";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { GraphUp } from "react-bootstrap-icons";
import PercentageChange from "../SharedArea/PercentageChange";
import StockBuyHistory from "./StockBuyHistory";
import { currencyFormat, profit, stock, totalPortfolio, totalProfit } from "../SharedArea/Utils";

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
  }, [userStocks]);

  console.log(userStocks);

  return (
    <div>
      <h1>
        Your total portfolio: <span>{totalPortfolio(userStocks)}</span>
      </h1>
      <h1>
        Your total profit: <span>{totalProfit(userStocks)}</span>
      </h1>
      <Row gap={4} className="my-4">
        {userStocks.map((userStock) => (
          <Col className="d-flex justify-content-center">
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <Card.Title>{userStock.stockName}</Card.Title>
                <Card.Text>
                  <p>amount: {userStock.amount}</p>
                  <p>price: {stock(userStock)?.day0.price}</p>
                  <p className={profit(userStock) < 0 ? "danger" : "success"}>
                    profit: {currencyFormat(profit(userStock))}
                  </p>
                  <PercentageChange
                    from={stock(userStock)!.day0.price * userStock.amount}
                    to={stock(userStock)!.day0.price * userStock.amount - profit(userStock)}
                  />
                </Card.Text>
                <Link to={`/stockData/${userStock.stockName}`}>
                  <Button variant="primary">
                    <GraphUp size={18} />
                  </Button>
                </Link>
                <StockBuyHistory userStock={userStock} stock={stock(userStock)!} />
                <Link
                  to={`/user/transaction/${userStock.stockName}/${stock(userStock)?.day0.day}/${
                    stock(userStock)?.day0.price
                  }`}
                >
                  <Button variant="primary">Buy/Sell</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserPanel;
