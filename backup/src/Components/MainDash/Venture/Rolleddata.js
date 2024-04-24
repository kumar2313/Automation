import React, { useState } from 'react'
import useSWR from 'swr';
import './Mdbtable.css'
import DataTable from 'react-data-table-component';
import Feedloaddetails from './Feedloaddetails';
import Rolleddetails from './Rolleddetails';

const Rolleddata = () => {
    const [showdetails, showDetails] = useState(false)
    const [showdetailsdata, showDetailsdata] = useState({status:"COMPLETE"})

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {
        data: tradedata,
        error,
        isValidating,
    } = useSWR(process.env.REACT_APP_ROLLED_BY_SOURCE, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: true,
        revalidateOnReconnect: false
    });

    if (error) return <div>failed to load {error.message}</div>
    if (isValidating) return <div>loading...</div>

    const columns = [
        {
            name: 'Rolled Data by Source',
            selector: row => row.description,
            wrap: true,
            sortable: true,
            width: '600px'

        },
        {
            name: 'No of files',
            selector: row => row.count,
            width: '500px'

        }
        // {
        //     name: 'Action',
        //     cell: (row)=>{<button className="btn btn-primary">ok</button>},
        //     // width: '55px'
        // },

    ];

    const data = tradedata;

    // const conditionalRowStyles = [
    //     {
    //       when: row => row.today_count >500,
    //       style: {
    //         backgroundColor: 'yellow',

    //       },
    //     },

    //   ];

    const EntryHandler = (datadetails) => {
        console.log(datadetails)
        showDetailsdata(datadetails)
        showDetails(true)
        // if (datadetails.status!="COMPLETE" ){
        //     showDetails(true)
        // }
        // else{
        //     showDetails(false)
        // }
        // showDetails(true)
        // console.log("SHOW details", showdetails)



    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '20px', // override the row height
                border: '1px',
                borderStyle: 'solid',
                borderColor: 'CornflowerBlue'
            },
        },
        headCells: {
            style: {
                minHeight: '20px',
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                textAlign: 'center',
                backgroundColor: 'CornflowerBlue',
                color: 'white',
                fontSize: '12px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                // width:'90px',
                wordWrap: 'breakWord',
                color: 'black',
                // borderBottomWidth: '1px',
                // borderStyle: 'dashed',
                // borderLeft:'1px'
            },
        },
    };
    // let template;
    // if (showdetailsdata.status == "RUNNING") {
    //     template = <Feedloaddetails data={showdetailsdata} classuse="datadetails" />
    //     // showDetails(!showdetails)
    //     // showDetails(true)
    // } else {
    //     // showDetails(false)
    //     template = ""
    // }
    

    return (

        <div>
            {/* showdetailsdata */}

            {showdetails&&<Rolleddetails data={showdetailsdata} classuse="datadetails" setShow={()=>showDetails(false)}/>}
            {/* <Rolleddetails */}
            {/* {template} */}

            <DataTable
                // title="Movie List"
                columns={columns}
                data={data}
                // conditionalRowStyles={conditionalRowStyles}
                onRowClicked={EntryHandler}
                Clicked
                customStyles={customStyles}
                highlightOnHover={true}
                progressPending={isValidating}
                // pagination
            // expandableRows 
            // selectableRows
            />
        </div>
    )
}

export default Rolleddata