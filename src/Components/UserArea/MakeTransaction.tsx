import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { TransactionModel } from "../../Models/TransactionModel";
import store from "../../Redux/store";
import { userStockAdded } from "../../Redux/UserStockAppState";
import notify, { SccMsg } from "../../Services/Notification";
import { makeTransaction } from "../../WebApi/UserApi";

function MakeTransaction(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const stockName = params.stockName;
  const date = params.date;
  const price = params.price;

  const schema = yup.object().shape({
    stockName: yup.string(),
    date: yup.string(),
    amount: yup.number().min(1),
    price: yup.number(),
    transactionType: yup.string().required("Transaction type is not specified"),
  });

  let defaultValues = {
    stockName: stockName,
    date: date,
    price: Number(price),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TransactionModel>({ defaultValues: defaultValues, mode: "all", resolver: yupResolver(schema) });

  const makeTrans = async (transaction: TransactionModel) => {
    await makeTransaction(transaction)
      .then((res) => {
        notify.success(SccMsg.MADE_TRANSACTION);
        console.log(res.data);
        store.dispatch(userStockAdded(res.data));
        navigate("/user");
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  

  return (
    <div className="form-style">
      <h2>Make Transaction</h2>
      <Form onSubmit={handleSubmit(makeTrans)}>
        <Form.Group className="mb-3" controlId="formStockName">
          <Form.Label>Stock Name</Form.Label>
          <Form.Control
            {...register("stockName")}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control {...register("date")} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            {...register("amount")}
            type="number"
            placeholder="Enter Amount"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control {...register("price")} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTransactionType">
          <Form.Label>Select Transaction Type</Form.Label>
          <Form.Control {...register("transactionType")} as="select">
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </Form.Control>
        </Form.Group>
        <Button disabled={!isValid} variant="primary" type="submit">
          Make Transaction
        </Button>
      </Form>
    </div>
  );
}

export default MakeTransaction;
