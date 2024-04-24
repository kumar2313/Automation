import React, { useState } from 'react'
import useSWR from 'swr';
import './Mdbtable.css'
import DataTable from 'react-data-table-component';
import Reportingjobsummary from './Reportingjobsummary';


const Reportingjobs = () => {
    const [showdetails, showDetails] = useState(false)
    const [showdetailsdata, showDetailsdata] = useState({status:"COMPLETE"})

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {
        data: tradedata,
        error,
        isValidating,
    } = useSWR(process.env.REACT_APP_REPORT_DET, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: true,
        revalidateOnReconnect: false
    });

    if (error) return <div>failed to load {error.message}</div>
    if (isValidating) return <div>loading...</div>

    const columns = [
        {
            name: 'COB Date',
            selector: row => row.business_date,
            wrap: true,
            sortable: true,
            width: '145px',
            conditionalCellStyles: [
                {
                    when: row => row.business_date.includes('NULL'),
                    style: {
                        color: 'red',

                    }
                },
            ]

        },
        {
            name: 'Instance Type',
            selector: row => row.instance_type,
            width: '95px',
            wrap: true,
            conditionalCellStyles: [
                {
                    when: row => row.instance_type.includes('NULL'),
                    style: {
                        color: 'red',

                    }
                },
            ]

        },
        {
            name: 'Description',
            selector: row => row.description,
            width: '150px',
            // wrap: true,
        },
        {
            name: 'instance',
            selector: row => row.instance,
            width: '70px',
            
        },
        {
            name: 'PrevInstance',
            selector: row => row.previnstance,
            width: '85px',
            
        },
        {
            name: 'Status',
            selector: row => row.status,
            width: '50px',
            conditionalCellStyles: [
                {
                    when: row => row.status.includes('Y'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },
                {
                    when: row => row.status.includes('C'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },
                {
                    when: row => row.status.includes('E'),
                    style: {
                        backgroundColor: 'Coral',

                    }
                },
                {
                    when: row => row.status.includes('N') || row.status.includes('R') || row.status.includes('X') || row.status.includes('Z') || row.status.includes('O'),
                    style: {
                        backgroundColor: 'DeepSkyBlue',

                    }
                },

            ]
        },
        {
            name: 'Count',
            selector: row => row.cnt,
            width: '60px'
        },
        {
            name: 'Total CCOB',
            selector: row => row.curcnt,
            width: '80px'
        },
        {
            name: 'Total PCOB',
            selector: row => row.prevcont,
            width: '80px',
            

        },
        {
            name: '% Completed',
            selector: row => row.perc,
            width: '90px',
            

        },
        {
            name: 'Last Load Hr',
            selector: row => row.mxt,
            width: '85px'
        },
        {
            name: 'SLA',
            selector: row => row.SLA,
            width: '40px'
        },
        {
            name: 'State',
            selector: row => row.State,
            width: '75px',
            conditionalCellStyles: [
                {
                    when: row => row.State.includes('InLimit'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },
                {
                    when: row => row.State.includes('Breached'),
                    style: {
                        backgroundColor: 'Coral',

                    }
                },

            ]
        },
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
        console.log("data details: ",datadetails)
        showDetailsdata(datadetails)
        if (datadetails.status==="E"){
            showDetails(true)
        }
        else{
            showDetails(false)
        }
        // showDetails(true)
        console.log("SHOW details", showdetails)

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
            {/* <Draggable>
                <> */}
            {showdetails&&<Reportingjobsummary data={showdetailsdata} classuse="datadetails" setShow={()=>showDetails(false)}/>}
            {/* </>
            </Draggable> */}
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

export default Reportingjobs