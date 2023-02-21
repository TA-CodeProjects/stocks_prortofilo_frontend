import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { StockModel } from "../../Models/StockModel";
import { stocksAdded } from "../../Redux/StockAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { addStock } from "../../WebApi/AdminApi";

function AddStock(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    stockName: yup.string().required("Stock name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StockModel>({ mode: "all", resolver: yupResolver(schema) });

  const add = async (stock: StockModel) => {
    addStock(stock)
      .then((res) => {
        notify.success(SccMsg.ADDED_STOCK);
        store.dispatch(stocksAdded(res.data));
        navigate("/admin/stock");
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  return (
    <div className="form-style">
      <h2>Add Stock</h2>
      <Form onSubmit={handleSubmit(add)} className="border border-default border-3 p-4 my-5">
        <Form.Group className="mb-3" controlId="formStockName">
          <Form.Label>Stock Name</Form.Label>
          <Form.Control {...register("stockName")} type="text" placeholder="Enter stock name" />
          <span className="text-danger">{errors.stockName?.message}</span>
        </Form.Group>
        <Form.Group>
          <Button disabled={!isValid} className="primary" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
  }

  export default AddStock;
