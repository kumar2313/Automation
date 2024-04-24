import React from 'react'
import useSWR from 'swr';
import './Mdbtable.css'
import DataTable from 'react-data-table-component';

const Reportcomparisondeviation = () => {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const {
        data: repdata,
        error,
        isValidating,
    } = useSWR(process.env.REACT_APP_REP_COMP, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if (error) return <div>failed to load {error.message}</div>
    if (isValidating) return <div>loading...</div>

    const columns = [
        {
            name: 'Instance',
            selector: row => row.instance,
            wrap:true,
            sortable: true,
            width:'80px'
            
        },
        {
            name: 'Instance Name',
            selector: row => row.inst_name,
            wrap:true,
            // conditionalCellStyles:[
            //     {
            //       when: row => row.inst_name.includes('CPVaR'),
            //       style: {
            //         backgroundColor: 'blue',
                    
            //       }
            //     },

               
            //   ]
            
        },
        {
            name: 'Pending',
            selector: row => row.tdy_pending,
            width:'80px'
        },
        {
            name: 'Error',
            selector: row => row.tdy_error,
            width:'80px'
        },
        {
            name: 'Completed',
            selector: row => row.tdy_completed,
            width:'80px'
        },
        {
            name: 'Total',
            selector: row => row.tdy_total,
            width:'80px'
        },
        {
            name: 'Count Yesterday',
            selector: row => row.yest_completed,
            width:'80px'
        },
        {
            name: 'Deviation',
            selector: row => row.deviation,
            width:'80px',
            conditionalCellStyles:[
                {
                  when: row => row.deviation >10,
                  style: {
                    backgroundColor: 'coral',
                    
                  }
                },
                {
                  when: row => row.deviation <=10,
                  style: {
                    backgroundColor: 'PaleGreen',
                    
                  },
                },
               
              ]
        },
    ];

    const data = repdata;
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
                fontSize: '12px',
                wordWrap: 'break-word',
                wrap: true
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
  )
}

export default Reportcomparisondeviation