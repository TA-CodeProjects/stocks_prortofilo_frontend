import moment from "moment";
import { Table } from "react-bootstrap";
import { StockPerformanceModel } from "../../Models/StockPerformanceModel";
import { UserStockModel } from "../../Models/UserStockModel";

interface StockBuyHistoryProps {
    userStock: UserStockModel;
    stock: StockPerformanceModel;
}

function StockBuyHistory(props: StockBuyHistoryProps): JSX.Element {
    return (
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {props.userStock.userStockHistoryList.map((stockHistory) => (
            <tr>
              <td>{moment(stockHistory.date).format("DD/MM/yyyy")}</td>
              <td>{stockHistory.amount}</td>
              <td>{stockHistory.price}</td>
              <td>{stockHistory.transactionType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
}

export default StockBuyHistory;