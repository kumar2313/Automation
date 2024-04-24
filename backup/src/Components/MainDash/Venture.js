import React from 'react'
import Chartdraw from './Card/Chartdraw'
import Cremant from './Card/Cremant'
import Cremantsensitivity from './Card/Cremantsensitivity'
import Datepic from './Card/Datepic'
import DynamicChart from './Card/DynamicChart'
import Routerdesign from './Card/Routerdesign'
import Currentdate from './Utility/Currentdate'
import Dateminusdays from './Utility/Dateminusdays'
// import Tradelevelcomp from './Venture/Tradelevelcomp'
import './Venture.css'
// import Reportcomparisondeviation from './Venture/Reportcomparisondeviation'
import Feedload from './Venture/Feedload'
import Reportingjobs from './Venture/Reportingjobs'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Slatracker from './Card/Slatracker'
import Rolleddata from './Venture/Rolleddata'
import Slareportingtrend from './Card/Slareportingtrend'
import Slaloadingtrend from './Card/Slaloadingtrend'

const Venture = () => {

  let enddate=Currentdate()
  let startdate=Dateminusdays(10)


  const resetjobs = () => {
    if (window.confirm('Are you sure you want to reset the Reporting Job failures?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }
  return (
    <div>
      <br />
      <br />
      <br />
      {/* <br /> */}
      {/* <div className="statusbar">
        <Statuscard />
      </div> */}
<Tabs
      defaultActiveKey="batchstatus"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="batchstatus" title="Batch Status">
      {/* Feed Loading Status */}
      <div>
      
        <div className="repload">
          <div className="tradeleve2">
            <div className="headdiv">
              <h6 className="headingtext">Feed Loading Status</h6>
              {/* <button className="Restbutt" onClick={()=>resetjobs()}>Reset Failures</button> */}

            </div>
            <Feedload />
            <Rolleddata/>
          </div>

          

          <div className="repjobs">
            <div className="headdiv">
              <h6 className="headingtext">Reporting Jobs by Instance</h6>
            </div>
            <Reportingjobs />
          </div>
        </div>
        <div className="tradesummarymain">
          <div className="tradesummary">
            <Routerdesign />

          </div >
          <Cremant
            statuscnt={process.env.REACT_APP_CREMANT_ASIA_CNT_STATUS}
            mssingcnt={process.env.REACT_APP_CREMANT_ASIA_MISSING_CNT}
            statusdet={process.env.REACT_APP_CREMANT_ASIA_DET}
            missingdet={process.env.REACT_APP_CREMANT_ASIA_MISSING_DET}
            completedcnt={process.env.REACT_APP_CREMANT_ASIA_COMPLETE}
            sladata={process.env.REACT_APP_CRE_ASIA_SLA}
            colortoadd="red"
            cardheading="Cremant Asia"
          />

          <Cremant
            statuscnt={process.env.REACT_APP_CREMANT_LDN_CNT_STATUS}
            mssingcnt={process.env.REACT_APP_CREMANT_LDN_MISSING_CNT}
            statusdet={process.env.REACT_APP_CREMANT_LDN_DET}
            missingdet={process.env.REACT_APP_CREMANT_LDN_MISSING_DET}
            completedcnt={process.env.REACT_APP_CREMANT_LDN_COMPLETE}
            sladata={process.env.REACT_APP_CRE_LDN_SLA}
            colortoadd="Blue"
            cardheading="Cremant London"
          />

          <Cremantsensitivity
            statuscnt={process.env.REACT_APP_CRE_SENS_DET} //done
            mssingcnt={process.env.REACT_APP_CRE_SENS_PEND} //done
            statusdet={process.env.REACT_APP_CRE_SENS_DRILL_DET} //done
            missingdet={process.env.REACT_APP_CRE_SENS_PEND_DET}
            completedcnt={process.env.REACT_APP_CRE_SENS_COU} //done
            sladata={process.env.REACT_APP_CRE_SENS_SLA}
            colortoadd="Blue"
            cardheading="Cremant Sensitivity"
          />
        </div>
        {/* <div className="cremasummary">
          <Cremant/>
        </div> */}
      </div>

      {/* Reporting Job Status */}
      {/* <div>
        <div className="repjobs">
          <div className="headdiv">
            <h6 className="headingtext">Reporting Jobs by Instance</h6>
          </div>
          <Reportingjobs />
        </div>
      </div> */}


      {/* <div className="tradelevel">
          <h6>Feed Loading Comparison from pervious COB</h6>
          <Tradelevelcomp />
        </div> */}
      {/* <div className="reportlevel">
          <h6>Top Nodes- Reporting Job's Status</h6>
          <Reportcomparisondeviation/>
        </div> */}
    {/* <Chartdraw/> */}
    {/* <Datepic/>
    <Datepic/> */}
    </Tab>
    <Tab eventKey="slatracker" title="SLA Tracker - Feed Loading /Reporting">
        <Slatracker startdate={startdate} enddate={enddate} trendurl={process.env.REACT_APP_SLA_TABLE}/>
      </Tab>
      <Tab eventKey="slaloadtrending" title="SLA Reporting Trending">
        <Slareportingtrend startdate={startdate} enddate={enddate} trendurl={process.env.REACT_APP_SLA_REP_HIST_TREN}/>
      </Tab>
      <Tab eventKey="slatrending" title="SLA Loading Trending">
        <Slaloadingtrend startdate={startdate} enddate={enddate} trendurl={process.env.REACT_APP_SLA_LOA_HIST_TREN}/>
      </Tab>
      
</Tabs>
    </div>
  )
}

export default Venture