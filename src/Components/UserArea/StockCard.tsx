import { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { GraphUp } from "react-bootstrap-icons";
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
      <Col className="d-flex justify-content-center text-dark">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>{props.userStock.stockName}</Card.Title>
            <Card.Text>
              <p>amount: {props.userStock.amount}</p>
              <p>price: {stock(props.userStock)?.day0.price}</p>
              <p className={profit(props.userStock) < 0 ? "danger" : "success"}>
                profit: {currencyFormat(profit(props.userStock))}
              </p>
              <PercentageChange
                from={stock(props.userStock)!.day0.price * props.userStock.amount}
                to={
                  stock(props.userStock)!.day0.price * props.userStock.amount -
                  profit(props.userStock)
                }
              />
            </Card.Text>
            <Link to={`/stockData/${props.userStock.stockName}`}>
              <Button variant="primary">
                <GraphUp size={18} />
              </Button>
            </Link>
            <Button onClick={handleOpen} variant="primary">
              Transction
            </Button>
            <StockDetail userStock={props.userStock} show={show} handleClose={handleClose} />
          </Card.Body>
        </Card>
      </Col>
    );
}

export default StockCard;