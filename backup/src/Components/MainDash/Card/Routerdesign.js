import React from 'react'
import Statuscard from './Statuscard'

const Routerdesign = () => {

// Rolled Books Details
    const columns = [
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            wrap: true,
            width: '520px'

        },
        {
            name: 'Source',
            selector: row => row.source,
            wrap: true,
            width: '200px',
            sortable: true,


        },
        {
            name: 'Book Id',
            selector: row => row.book_id,
            wrap: true,
            width: '345px',
            sortable: true,

        },
        {
            name: 'Count',
            selector: row => row.count,
            wrap: true,
            width: '200px',
            sortable: true,


        },
        
    ];


    const sercolumns = [
        {
            name: 'ID',
            selector: row => row.ID,
            sortable: true,
            wrap: true,
            width: '80px'

        },
        {
            name: 'Description',
            selector: row => row.NAME,
            wrap: true,
            width: '600px',
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.NAME.includes('Stopped'),
                    style: {
                        backgroundColor: 'Coral',

                    }
                },
                {
                    when: row => row.NAME.includes('Running'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },

            ]


        },
        
        
    ];
    // Rolled Books Level 2 Details
    const columns2 = [
        {
            name: 'Source ID',
            selector: row => row.source_id,
            sortable: true,
            wrap: true,
            width: '85px'

        },
        {
            name: 'Description',
            selector: row => row.description,
            wrap: true,
            width: '150px',
            sortable: true,


        },
        {
            name: 'source',
            selector: row => row.source,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'business_date',
            selector: row => row.business_date,
            wrap: true,
            width: '150px',
            sortable: true,


        },
        {
            name: 'instance',
            selector: row => row.instance,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'file_id',
            selector: row => row.file_id,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'hierarchy_id',
            selector: row => row.hierarchy_id,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'status',
            selector: row => row.status,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'roll_reason',
            selector: row => row.roll_reason,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'book_id',
            selector: row => row.book_id,
            wrap: true,
            width: '85px',
            sortable: true,

        },
        {
            name: 'component',
            selector: row => row.component,
            wrap: true,
            width: '200px',
            sortable: true,

        },
        {
            name: 'file_name',
            selector: row => row.file_name,
            wrap: true,
            width: '220px',
            sortable: true,

        },
        
        
    ];

// Missing Details
const missingdet = [
    {
        name: 'Batch Name',
        selector: row => row.batch_name,
        sortable: true,
        wrap: true,
        width: '200px'

    },
    {
        name: 'file_id',
        selector: row => row.file_id,
        wrap: true,
        width: '150px',
        sortable: true,


    },
    {
        name: 'Params',
        selector: row => row.params,
        wrap: true,
        width: '200px',
        sortable: true,

    },
    {
        name: 'risk_type_id',
        selector: row => row.risk_type_id,
        wrap: true,
        width: '150px',
        sortable: true,


    },
    {
        name: 'risk_type',
        selector: row => row.risk_type,
        wrap: true,
        width: '150px',
        sortable: true,


    },
    {
        name: 'description',
        selector: row => row.description,
        wrap: true,
        width: '415px',
        sortable: true,


    },
    
];

const diskcolumns = [
    {
        name: 'Mount',
        selector: row => row.mountedon,
        sortable: true,
        wrap: true,
        width: '150px'

    },
    {
        name: 'Total Size',
        selector: row => row.size,
        sortable: true,
        wrap: true,
        width: '85px'

    },
    {
        name: 'Used Size',
        selector: row => row.used,
        sortable: true,
        wrap: true,
        width: '85px'

    },
    {
        name: 'Available',
        selector: row => row.avail,
        sortable: true,
        wrap: true,
        width: '150px'

    },
    {
        name: 'Used %',
        selector: row => row.usepercentage,
        wrap: true,
        width: '80px',
        sortable: true,
        conditionalCellStyles: [
            {
                when: row => row.usepercentage>=85,
                style: {
                    backgroundColor: 'Coral',

                }
            },
            {
                when: row => row.usepercentage<85,
                style: {
                    backgroundColor: 'PaleGreen',

                }
            },

        ]


    },
    {
        name: 'File System',
        selector: row => row.filesystem,
        sortable: true,
        wrap: true,
        width: '650px'

    },
    
    
];


const dbcolumns = [
    {
        name: 'db_name',
        selector: row => row.db_name,
        sortable: true,
        wrap: true,
        width: '250px'

    },
    {
        name: 'data_size',
        selector: row => row.data_size,
        sortable: true,
        wrap: true,
        width: '180px'

    },
    {
        name: 'data_used',
        selector: row => row.data_used,
        sortable: true,
        wrap: true,
        width: '180px'

    },
    {
        name: 'Used %',
        selector: row => row.data_used_pct,
        wrap: true,
        width: '180px',
        sortable: true,
        conditionalCellStyles: [
            {
                when: row => row.data_used_pct>=90,
                style: {
                    backgroundColor: 'Coral',

                }
            },
            {
                when: row => row.data_used_pct<90,
                style: {
                    backgroundColor: 'PaleGreen',

                }
            },

        ]


    },
    {
        name: 'log_size',
        selector: row => row.log_size,
        sortable: true,
        wrap: true,
        width: '180px'

    },
    {
        name: 'log_used',
        selector: row => row.log_used,
        sortable: true,
        wrap: true,
        width: '180px'

    },
    {
        name: 'log_used_pct',
        selector: row => row.log_used_pct,
        sortable: true,
        wrap: true,
        width: '180px'

    },
    
    
];
// READT_APP_DISK_SPACE_DET='http://localhost:4000/diskspacedet'
// READT_APP_DISK_SPACE_COU='http://localhost:4000/diskspacecount'
// REACT_APP_VENTURE_STAT_CNT='http://localhost:4000/chkvencnt'
// REACT_APP_VENTURE_STAT_DET='http://localhost:4000/chkvenstatus'
    return (
        <>
                <Statuscard
                cardheading="Service Status"
                url={process.env.REACT_APP_VENTURE_STAT_CNT}
                colortoadd="red"
                sla="No"
                trend="No"
                //Below three properties are required for first level drill down
                drilldown="Yes"
                drillcomp={process.env.REACT_APP_VENTURE_STAT_DET}
                datacolumn={sercolumns}
                filterfield="ID"
                keyfield="ID"
                keyfield1="ID"
                headingl1="Service Details"
                //Below three properties are required for second level drill down
                drilldown2="No"
                drillcomp2=""
                datacolumn2=""
                filterfield2=""
                keyfield2=""
                headingl2=""
                namel2="" //used in DrillLevel2 to identify query
            />
            <Statuscard
                cardheading="Disk Space"
                url={process.env.REACT_APP_DISK_SPACE_COU}
                colortoadd="red"
                sla="No"
                trend="Yes"
                //Below three properties are required for first level drill down
                drilldown="Yes"
                drillcomp={process.env.REACT_APP_DISK_SPACE_DET}
                datacolumn={diskcolumns}
                filterfield="mountedon"
                keyfield="id"
                keyfield1="id"
                headingl1="Disk Space Details"
                //Below three properties are required for second level drill down
                drilldown2="No"
                drillcomp2=""
                datacolumn2=""
                filterfield2=""
                keyfield2=""
                headingl2=""
                namel2="" //used in DrillLevel2 to identify query
            />

            <Statuscard
                cardheading="DB Space"
                url={process.env.REACT_APP_DB_SPACE_COU}
                colortoadd="red"
                sla="No"
                trend="Yes"
                //Below three properties are required for first level drill down
                drilldown="Yes"
                drillcomp={process.env.REACT_APP_DB_SPACE_DET}
                datacolumn={dbcolumns}
                filterfield="db_name"
                keyfield="db_name"
                keyfield1="data_used"
                headingl1="DB Space Details"
                //Below three properties are required for second level drill down
                drilldown2="No"
                drillcomp2=""
                datacolumn2=""
                filterfield2=""
                keyfield2=""
                headingl2=""
                namel2="" //used in DrillLevel2 to identify query
            />
            <Statuscard
                cardheading="Rolled Books by Book ID"
                url={process.env.REACT_APP_ROLLED_COUNT}
                colortoadd="blue"
                sla="No"
                trend="No"
                //Below three properties are required for first level drill down
                drilldown="Yes"
                drillcomp={process.env.REACT_APP_ROLLED_FILEID}
                datacolumn={columns}
                filterfield="book_id"
                keyfield="book_id"
                keyfield1="source"
                headingl1="Rolled Books by ID"
                //Below three properties are required for second level drill down
                drilldown2="Yes"
                drillcomp2={process.env.REACT_APP_ROLLED_DETAILS}
                datacolumn2={columns2}
                filterfield2="file_name"
                keyfield2="hierarchy_id"
                headingl2="Rolled Books Details"
                namel2="reportdrill2" //used in DrillLevel2 to identify query
            />

            <Statuscard
                cardheading="Missing Risk by Book ID"
                url={process.env.REACT_APP_MISSING_RISK}
                colortoadd="blue"
                sla="No"
                trend="No"
                //Below three properties are required for first level drill down
                drilldown="Yes"
                drillcomp={process.env.REACT_APP_MISSING_RISK_DET}
                datacolumn={missingdet}
                filterfield="batch_name"
                keyfield="params"
                keyfield1="risk_type_id"
                headingl1="Missing Risk Details"
                //Below three properties are required for second level drill down
                drilldown2="No"
                drillcomp2=""
                datacolumn2=""
                filterfield2=""
                keyfield2=""
                headingl2=""
                namel2="" //used in DrillLevel2 to identify query
            />
            

        </>
    )
}

export default Routerdesign
