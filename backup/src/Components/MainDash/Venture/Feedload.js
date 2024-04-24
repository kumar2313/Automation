import React, { useState } from 'react'
import useSWR from 'swr';
import './Mdbtable.css'
import DataTable from 'react-data-table-component';
import Feedloaddetails from './Feedloaddetails';

const Feedload = () => {
    const [showdetails, showDetails] = useState(false)
    const [showdetailsdata, showDetailsdata] = useState({status:"COMPLETE"})

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {
        data: tradedata,
        error,
        isValidating,
    } = useSWR(process.env.REACT_APP_FEED_LOAD, fetcher, {
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
            width: '150px'

        },
        {
            name: 'Batch Name',
            selector: row => row.batch_name,
            width: '150px'

        },
        {
            name: 'Instance',
            selector: row => row.instance,
            width: '70px'
        },
        {
            name: 'Status',
            selector: row => row.status,
            width: '95px',
            conditionalCellStyles: [
                {
                    when: row => row.status.includes('RUNNING'),
                    style: {
                        backgroundColor: 'DeepSkyBlue',

                    }
                },
                {
                    when: row => row.status.includes('QUEUED'),
                    style: {
                        backgroundColor: 'Gold',

                    }
                },
                {
                    when: row => row.status.includes('COMPLETE'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },
                {
                    when: row => row.status.includes('ERROR'),
                    style: {
                        backgroundColor: 'Coral',

                    }
                },

            ]
        },
        {
            name: 'Count',
            selector: row => row.count,
            width: '95px'
        },
        {
            name: 'Current COB',
            selector: row => row.total_current,
            width: '95px'
        },
        {
            name: 'Previous COB',
            selector: row => row.total_previous,
            width: '95px'
        },
        {
            name: '% Completed',
            selector: row => row.percent,
            width: '95px',
            conditionalCellStyles: [
                {
                    when: row => row.percent >= 95,
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },
                {
                    when: row => row.state.includes('InLimit') && row.percent <= 95,
                    style: {
                        backgroundColor: 'DeepSkyBlue',

                    }
                },
                {
                    when: row => row.state.includes('Breach') && row.percent <= 95,
                    style: {
                        backgroundColor: 'Coral',

                    }
                },
                //   {
                //     when: row => row => row.state.includes('InLimit') && row.percent>=80,
                //     style: {
                //       backgroundColor: 'Coral',

                //     }
                //   },

            ]

        },
        {
            name: 'Last Load Hr',
            selector: row => row.last_lad_hr,
            width: '85px'
        },
        {
            name: 'SLA',
            selector: row => row.SLA,
            width: '85px'
        },
        {
            name: 'State',
            selector: row => row.state,
            width: '85px',
            conditionalCellStyles: [
                {
                    when: row => row.state.includes('InLimit'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },
                {
                    when: row => row.state.includes('Breached'),
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
        console.log(datadetails)
        showDetailsdata(datadetails)
        if (datadetails.status!="COMPLETE" ){
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

            {showdetails&&<Feedloaddetails data={showdetailsdata} classuse="datadetails" setShow={()=>showDetails(false)}/>}
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

export default Feedload