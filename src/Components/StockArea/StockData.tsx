import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { StockDataModel } from "../../Models/StockDataModel";
import { StockDataDownloadAction } from "../../Redux/StockDataAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { getStockDay } from "../../WebApi/StockApi";
import StockDataChart from "./StockDataChart";



function StockData(): JSX.Element {
  const params = useParams();
  const stockName = params.stockName || "";

  const [stockData, setStockData] = useState<StockDataModel>(
    store.getState().stockDataState.stocksData.filter(stock => stock.stockName === stockName)[0]
  );

  const [sliceData, setSliceData] = useState<number>(-7);

  const handleSelect = (eventKey: any) => {
    setSliceData(eventKey);
  };

  useEffect(() => {
    if (stockData === undefined) {
      getStockDay(stockName)
        .then((res) => {
          notify.success(SccMsg.GOT_STOCK_DATA);
          setStockData(res.data);
          store.dispatch(StockDataDownloadAction(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, [stockName]);

 

  return (
    <div className="stockData w-75">
      <Nav variant="tabs" defaultActiveKey="link1" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="-7">7 days</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="-22">30 days</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="0">90 days</Nav.Link>
        </Nav.Item>
      </Nav>

      <StockDataChart stockData={stockData} slice={sliceData} />
    </div>
  );
}

export default StockData;
