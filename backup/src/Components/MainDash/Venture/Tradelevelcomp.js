import React from 'react'
import useSWR from 'swr';
import './Mdbtable.css'
import DataTable from 'react-data-table-component';

// https://react-data-table-component.netlify.app/?path=/story/custom-styles-compact-grid--compact-grid

const Tradelevelcomp = () => {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {
        data: tradedata,
        error,
        isValidating,
    } = useSWR(process.env.REACT_APP_TRADE_SUMMARY, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if (error) return <div>failed to load {error.message}</div>
    if (isValidating) return <div>loading...</div>

    const columns = [
        {
            name: 'Batch Name',
            selector: row => row.batch_name,
            wrap:true,
            sortable: true,
            
        },
        {
            name: 'Current COB',
            selector: row => row.today_count,
            width:'85px'
            
        },
        {
            name: 'Previous COB',
            selector: row => row.yest_count,
            width:'85px'
        },
        {
            name: 'Deviation',
            selector: row => row.devia,
            width:'70px',
            conditionalCellStyles:[
                {
                  when: row => row.devia >10,
                  style: {
                    backgroundColor: 'coral',
                    
                  }
                },
                {
                  when: row => row.devia <=10,
                  style: {
                    backgroundColor: 'PaleGreen',
                    
                  },
                },
               
              ]
        },
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

     const notebookEntryHandler = (a) => {
        console.log(a)
      }

      const customStyles = {
        rows: {
            style: {
                minHeight: '20px', // override the row height
                border: '1px',
                borderStyle:'solid',
                borderColor: 'purple'
            },
        },
        headCells: {
            style: {
                minHeight: '20px',
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                textAlign: 'center',
                backgroundColor: 'purple',
                color:'white',
                fontSize: '12px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                width:'90px',
                wordWrap: 'breakWord',
                color:'purple',
                // borderBottomWidth: '1px',
                // borderStyle: 'dashed',
                // borderLeft:'1px'
            },
        },
    };

    return (
        // <div className="temp">
            <DataTable
            // title="Movie List"
                columns={columns}
                data={data}
                // conditionalRowStyles={conditionalRowStyles}
                onRowClicked={notebookEntryHandler}
                Clicked
                customStyles={customStyles}
                highlightOnHover={true}
                progressPending={isValidating}
                // expandableRows 
                // selectableRows
            />
        // </div>
    )
}

export default Tradelevelcomp