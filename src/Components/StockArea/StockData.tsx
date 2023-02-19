import { useEffect, useState } from "react";
import { Col, Nav, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { StockDataModel } from "../../Models/StockDataModel";
import { StockPerformanceModel } from "../../Models/StockPerformanceModel";
import { StockDataDownloadAction } from "../../Redux/StockDataAppState";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";
import { getStockDay } from "../../WebApi/StockApi";
import PercentageChange from "../SharedArea/PercentageChange";
import StockDataChart from "./StockDataChart";



function StockData(): JSX.Element {
  const params = useParams();
  const stockName = params.stockName || "";

  const [stockData, setStockData] = useState<StockDataModel>(
    store.getState().stockDataState.stocksData.filter(stock => stock.stockName === stockName)[0]
  );

  const stock: StockPerformanceModel = store
    .getState()
    .stockPerformanceState.stocksPerformance.filter((stock) => stock.stockName === stockName)[0];

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
    <div className="stockData">
      <Row className="d-flex align-items-center">
        <Col xs={9}>
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
        </Col>
        <Col xs={3}>
          <Stack gap={3}>
            <div className="bg-light border">
              <h2>{stock?.stockName}</h2>
            </div>
            <div className="bg-light border">
              <h2>{stock?.day0.price}</h2>
            </div>
            <div className="bg-light border">
              last day:{" "}
              <PercentageChange from={stock.day0.price} to={stock.day1.price} />
            </div>
            <div className="bg-light border">
              last 7 days:{" "}
              <PercentageChange from={stock.day0.price} to={stock.day5.price} />
            </div>
            <div className="bg-light border">
              last 30 days:{" "}
              <PercentageChange
                from={stock.day0.price}
                to={stock.day22.price}
              />
            </div>
            <div className="bg-light border">
              last 90 days:{" "}
              <PercentageChange
                from={stock.day0.price}
                to={stock.day66.price}
              />
            </div>
          </Stack>
        </Col>
      </Row>
    </div>
  );
}

export default StockData;
