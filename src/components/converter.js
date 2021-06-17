import React, { useEffect, useState } from "react";
import moment from "moment";
import { Select, DatePicker, Input, Col, Row, Tabs } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchExchangeRateStarted,
  fetchExchangeRateSuccess,
  fetchExchangeRateFail
} from '../redux/converter/actions';


const { Option } = Select;
const { TabPane } = Tabs;

const Converter = (props) => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(fetchExchangeRateStarted());
    const res = await fetch(
      `https://www.bankofcanada.ca/valet/observations/FXCAD${fromCurrency}/json?start_date=${date}&end_date=${date}`
    );
    const data = await res.json();

    if (data.observations.length !== 0) {
      dispatch(fetchExchangeRateSuccess(data.observations[0][`FXCAD${fromCurrency}`]["v"]));
    } else {
      dispatch(fetchExchangeRateFail("There is no exchange rate on this date!"));
    };
  };

  useEffect(
    () => {fetchData(date, fromCurrency)},
    [fromCurrency, date]
  );

  const exchangeRate = useSelector(state => state.rateReducer.rate);
  const isLoading = useSelector(state => state.rateReducer.loading);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    if (exchangeRate) {
      toAmount = (amount / exchangeRate).toFixed(4);
    } else {
      toAmount = "";
    };
  } else {
    toAmount = amount;
    if (exchangeRate) {
      fromAmount = (amount * exchangeRate).toFixed(4);
    } else {
      fromAmount = "";
    };
  };

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  const handleChangeTabs = (key) => {
    if (key === "3") {
      props.history.push('/about');
    } else if (key === "1") {
      props.history.push('/');
    } else {
      props.history.push('/converter');
    }
  };

  return (
    <div className="converter">
      <Tabs defaultActiveKey="2" centered onChange={handleChangeTabs}>
        <TabPane tab="Main Page" key="1" />
        <TabPane tab="Converter" key="2">
          <h1>Currency Coverter</h1>
          <div style={{ marginTop: "10px" }}>
            <h4>Date</h4>
            <DatePicker defaultValue={moment()} onChange={date => setDate(moment(date).format("YYYY-MM-DD"))} />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Input.Group size="large">
              <h4>Amount of Foreign Currency</h4>
              <Row gutter={8}>
                <Col span={10}>
                  <Input value={fromAmount} onChange={handleFromAmountChange}/>
                </Col>
                <Col span={8}>
                  <Select value={fromCurrency} onChange={value => setFromCurrency(value)}>
                    <Option value="USD">USD</Option>
                    <Option value="EUR">EUR</Option>
                    <Option value="CNY">CNY</Option>
                    <Option value="HKD">HKD</Option>
                    <Option value="JPY">JPY</Option>
                  </Select>
                </Col>
              </Row>
            </Input.Group>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Input.Group size="large">
              <h4>Amount of Canadian Dollar</h4>
              <Row gutter={8}>
                <Col span={10}>
                  <Input value={toAmount} onChange={handleToAmountChange}/>
                </Col>
                <Col span={8}>
                  <Select placeholder="CAD">
                    <Option value="CAD">CAD</Option>
                  </Select>
                </Col>
              </Row>
            </Input.Group>
          </div>
          <div style={{ marginTop: "10px" }}>
              <p>
                Exchange rate from CAD to {fromCurrency} is <strong>{exchangeRate}</strong> .
              </p>
          </div>
        </TabPane>
        <TabPane tab="About This App" key="3" />
      </Tabs>
    </div>
  );

};

export default Converter;