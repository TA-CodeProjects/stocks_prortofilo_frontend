import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { UserStockModel } from "../../Models/UserStockModel";
import store from "../../Redux/store";

export const stock = (userStock: UserStockModel) => {
  return store
    .getState()
    .stockPerformanceState.stocksPerformance.find(
      (stock) => stock.stockName === userStock.stockName
    );
};

export const totalPortfolio = (userStocks: UserStockModel[]) => {
    let total = 0;
    for (let i = 0; i < userStocks.length; i++) {
      let price = stock(userStocks[i])?.day0.price;
      total = total + userStocks[i].amount * price!;
    }
    return currencyFormat(total);
};

export const profit = (userStock: UserStockModel) => {
  let price = stock(userStock)?.day0.price;
  let totalBuy = 0;
  for (let j = 0; j < userStock.userStockHistoryList.length; j++) {
    if (userStock.userStockHistoryList[j].transactionType === "BUY") {
      totalBuy +=
        userStock.userStockHistoryList[j].amount * userStock.userStockHistoryList[j].price;
    } else {
      totalBuy -=
        userStock.userStockHistoryList[j].amount * userStock.userStockHistoryList[j - 1].price;
    }
  }
  let total = userStock.amount * price! - totalBuy;
  return total;
};

export const totalProfit: any = (userStocks: UserStockModel[]) => {
  let total = 0;
  for (let i = 0; i < userStocks.length; i++) {
    total += profit(userStocks[i]);
  }
  return (
    <>
      {total > 0 ? <ArrowUp /> : <ArrowDown />}{" "}
      <span>{currencyFormat(total)}</span>
    </>
  );
};

export const currencyFormat = (num: number) => {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
