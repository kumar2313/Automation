import React, { useState, useRef, useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './Chartdraw.css'
import Datepic from "./Datepic";
import { NameContext } from '../../../RouterApp';

const Chartdraw = (props) => {

    // const chartRef = useRef(null);
    const { setShowRouter, setalertMessage, setalertHeader, setalertVariant } = useContext(NameContext)
    const d = new Date();
    let [sdata, setStartdate] = useState(new Date())
    let [edata, setEnddate] = useState(new Date())
    console.log(sdata);

    function submitdata() {
        // const base64Image = chartRef.current.base64Image()
        let std = moment(sdata).format('YYYY-MM-DD');
        let etd = moment(edata).format('YYYY-MM-DD');
        console.log("Dates are : ", std, etd)
        if (etd < std) {
            // alert("!! Start Date should be less than End Date !!")
            setalertHeader("Trending Error")
            setalertVariant("danger")
            setalertMessage("!! Start Date should be less than End Date !!")
            setShowRouter(true)

        }
        else {
            props.refChart(std, etd)
            setalertHeader("Trending Refreshed")
            setalertVariant("success")
            setalertMessage("Trending Data Refreshed")
            setShowRouter(true)
        }
    }

    // if (sdata) {
    //     let adata = moment(sdata).format('YYYY-MM-DD');
    //     console.log("data is", adata);
    //     console.log(typeof adata)
    // }

    return (
        <div >
            <div class="grid-container">
                <div class="grid-child">
                    Start Date:
                </div>

                <div class="grid-child">
                    <DatePicker className="datePicker"
                        selected={sdata}
                        onChange={(date, event) => setStartdate(date)}
                        // dateFormat="YYYYMMdd"
                        dateFormat="MM/dd/yyyy"
                    // minDate={new Date()}
                    />
                </div>
                <div class="grid-child">
                    End Date:
                </div>
                <div class="grid-child">
                    <DatePicker className="datePicker"
                        selected={edata}
                        onChange={(date, event) => setEnddate(date)}
                        // dateFormat="YYYYMMdd"
                        dateFormat="MM/dd/yyyy"
                    // minDate={new Date()}
                    // maxDate={addDays(new Date(), 7)}  
                    />
                </div>
                <div class="grid-child">
                    <button className="button-8" onClick={() => { submitdata() }}>Filter</button>
                </div>

            </div>

            <div>
                <Line
                    height="30%"
                    width="100%"
                    data={props.chartData}
                    // ref={chartRef}
                    options={{
                        responsive: true,
                        title: { text: "Disk Space", display: true },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Chartdraw
