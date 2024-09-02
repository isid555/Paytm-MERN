import {Appbar} from "./Appbar.jsx";
import {Balance} from "./Balance.jsx";
import {Users} from "./Users.jsx";

function Dashboard(){
return(
    <div>
        <Appbar/>
        <div className={"m-8"}>
            <Balance value={"10,00,000"}/>
            <Users/>
        </div>
    </div>
)
}
export default Dashboard;