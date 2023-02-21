import { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { GraphUp, Tag } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { UserStockModel } from "../../Models/UserStockModel";
import PercentageChange from "../SharedArea/PercentageChange";
import { currencyFormat, profit, stock } from "../SharedArea/Utils";
import StockBuyHistory from "./StockBuyHistory";
import StockDetail from "./StockDetail";

interface StockCardProps {
  userStock: UserStockModel;
}

function StockCard(props: StockCardProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <Col className="d-flex justify-content-center">
      <Card style={{ width: "18rem" }} className="bg-primary ">
        <Card.Header>
          <h2>{props.userStock.stockName}</h2>
          <span className={profit(props.userStock) < 0 ? "danger" : "success"}>
            {currencyFormat(profit(props.userStock))}{" "}
          </span>
          <small>
            <PercentageChange
              from={stock(props.userStock)!.day0.price * props.userStock.amount}
              to={
                stock(props.userStock)!.day0.price * props.userStock.amount -
                profit(props.userStock)
              }
            />
          </small>
        </Card.Header>
        <Card.Body>
          <h5>Stocks: {props.userStock.amount}</h5>
          <p>
            <span>
              <Tag />
            </span>{" "}
            $ {stock(props.userStock)?.day0.price}
          </p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-around">
          <div>
            <Link to={`/stockData/${props.userStock.stockName}`}>
              <Button variant="primary">
                <GraphUp size={24} />
              </Button>
            </Link>
          </div>
          <div>
            <Button onClick={handleOpen} variant="success">
              Transctions
            </Button>
            <StockDetail userStock={props.userStock} show={show} handleClose={handleClose} />
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default StockCard;
