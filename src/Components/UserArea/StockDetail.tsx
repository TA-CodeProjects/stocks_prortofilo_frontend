import { Button, Modal, ModalFooter } from "react-bootstrap";
import { GraphUp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { UserStockModel } from "../../Models/UserStockModel";
import PercentageChange from "../SharedArea/PercentageChange";
import { currencyFormat, profit, stock } from "../SharedArea/Utils";
import StockBuyHistory from "./StockBuyHistory";

interface StockDetailProps {
  userStock: UserStockModel;
  show: boolean;
  handleClose: any;
}

function StockDetail(props: StockDetailProps): JSX.Element {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>{props.userStock.stockName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>amount: {props.userStock.amount}</p>
        <p>price: {stock(props.userStock)?.day0.price}</p>
        <p className={profit(props.userStock) < 0 ? "danger" : "success"}>
          profit: {currencyFormat(profit(props.userStock))}
        </p>
        <PercentageChange
          from={stock(props.userStock)!.day0.price * props.userStock.amount}
          to={stock(props.userStock)!.day0.price * props.userStock.amount - profit(props.userStock)}
        />
        <StockBuyHistory userStock={props.userStock} stock={stock(props.userStock)!} />
      </Modal.Body>
      <Modal.Footer>
        <Link
          to={`/user/transaction/${props.userStock.stockName}/${stock(props.userStock)?.day0.day}/${
            stock(props.userStock)?.day0.price
          }`}
        >
          <Button variant="primary">Buy/Sell</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default StockDetail;
