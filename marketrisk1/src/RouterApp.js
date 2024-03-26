import React from 'react';
import './App.css';
// import Chart from './Components/Charts/Chart';

// import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { createContext, useState } from "react";
import AlertDesign from "./Components/Tables/AlertDesign"
import Summary from './Components/Summary/Summary';
import Venture from './Components/MainDash/Venture';
import Nv from './Components/MainDash/Nv';
import Forest from './Components/MainDash/Forest';
import Mrx from './Components/MainDash/Mrx';
// import About from './About';
export const NameContext = createContext();
function RouterApp(props) {
    const navigate = useNavigate()
    const [show, setShowRouter] = useState(false);
    const [alertMessage, setalertMessage] = useState('');
    const [alertHeader, setalertHeader] = useState('');
    const [alertVariant, setalertVariant] = useState('');
    const [summary, setSummary] = useState(false);
    return (

        // <div className='AppGlass1'>
        //     <div className='btnBack'><button class="btnbck" type="button" onClick={()=>navigate(-1)}>Go Back</button></div>

        <div className="AppGlass">
            <div className='btnBack'>
                <button className="btnbck" type="button" onClick={() => setSummary(!summary)}>Summary</button>
                <button className="btnbck" type="button" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            {show && <AlertDesign heading={alertHeader} message={alertMessage} variant={alertVariant} setShow={() => setShowRouter(false)} />}
            {summary && <Summary switch={() => setSummary(false)}/> }

            {/* <Sidebar /> */}
            {/* <MainDash/> */}
            <Routes>
                
                <Route path='/' element={<NameContext.Provider value={{ setShowRouter, setalertMessage, setalertHeader, setalertVariant }}>
                    <Venture />
                </NameContext.Provider>
                } />

                
                <Route path='/nv' element={<NameContext.Provider value={{ setShowRouter, setalertMessage, setalertHeader, setalertVariant }}>
                    <Nv/>
                </NameContext.Provider>
                } />

                
                <Route path='/forest' element={<NameContext.Provider value={{ setShowRouter, setalertMessage, setalertHeader, setalertVariant }}>
                    <Forest/>
                </NameContext.Provider>
                } />

                
                <Route path='/mrx' element={<NameContext.Provider value={{ setShowRouter, setalertMessage, setalertHeader, setalertVariant }}>
                    <Mrx/>
                </NameContext.Provider>
                } />
            </Routes>
        </div>
        // </div>
    );
}

export default RouterApp;