import { Table } from "react-bootstrap";
import { UserModel } from "../../Models/UserModel";
import { currencyFormat, profit } from "../SharedArea/Utils";

interface UserDetailProps {
  user: UserModel;
}

function UserDetail(props: UserDetailProps): JSX.Element {
   

    return (
      <>
        {props.user.stocks.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Stock</th>
                <th>amount</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {props.user.stocks.map((stock) => (
                <tr>
                  <td>{stock.stockName}</td>
                  <td>{stock.amount}</td>
                  <td>
                      {currencyFormat(profit(stock))}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
}

export default UserDetail;