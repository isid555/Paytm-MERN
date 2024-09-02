import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import Dashboard from "./Dashboard.jsx";
import SendMoney from "./SendMoney.jsx";

function App() {

  return (
    <div className={""}>

        <BrowserRouter>

          <Routes>

            <Route path={"/signup"} element={ <Signup/> }></Route>
            <Route path={"/signin"} element={<Signin/> }></Route>
            <Route path={"/dashboard"} element={<Dashboard/>}></Route>
            <Route path={"/send"} element={<SendMoney/>}></Route>

          </Routes>


        </BrowserRouter>
    </div>
  )
}

export default App
