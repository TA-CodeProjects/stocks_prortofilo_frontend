import { useState } from "react";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { StockModel } from "../../Models/StockModel";
import DeleteStock from "./DeleteStock";

interface StockProps {
  stock: StockModel;
  setStocks: React.Dispatch<React.SetStateAction<StockModel[]>>;
}

function Stock(props: StockProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <tr>
      <td>{props.stock.stockName}</td>
      <td>
        <Button onClick={handleOpen} variant="default">
          <Trash3 />
        </Button>
        <DeleteStock id={props.stock.id} show={show} handleClose={handleClose} setStocks={props.setStocks} />
      </td>
    </tr>
  );
}

export default Stock;
