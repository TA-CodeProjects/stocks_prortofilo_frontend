import { Button, Modal } from "react-bootstrap";
import { StockModel } from "../../Models/StockModel";
import { stocksDeleted } from "../../Redux/StockAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { deleteStock } from "../../WebApi/AdminApi";

interface DeleteStockProps {
  id: number;
  show: boolean;
  handleClose: any;
  setStocks: React.Dispatch<React.SetStateAction<StockModel[]>>;
}

function DeleteStock(props: DeleteStockProps): JSX.Element {
  const yes = () => {
    deleteStock(props.id)
      .then((any) => {
        notify.success(SccMsg.DELETE_STOCK);
        store.dispatch(stocksDeleted(props.id));
        props.handleClose();
      })
      .catch((err) => notify.error(err));
    return store.subscribe(() => {
      props.setStocks(store.getState().stockState.stocks);
    });
  };

  const no = () => {
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete stock #{props.id}?</Modal.Body>
        <Modal.Footer>
          <Button onClick={yes} variant="danger" className="mx-2">
            Yes
          </Button>
          <Button onClick={no} variant="secondary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteStock;
