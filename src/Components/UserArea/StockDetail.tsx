import { Button, Modal, ModalFooter } from "react-bootstrap";
import {  Tag } from "react-bootstrap-icons";
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
    <Modal show={props.show} onHide={props.handleClose} className="text-center">
      <Modal.Header>
        <Modal.Title>{props.userStock.stockName}</Modal.Title>
        <div>
          <span>
            <Tag />
          </span>{" "}
          $ {stock(props.userStock)?.day0.price}
        </div>
        <div>
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
        </div>
      </Modal.Header>
      <Modal.Body>
        <StockBuyHistory userStock={props.userStock} stock={stock(props.userStock)!} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
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
