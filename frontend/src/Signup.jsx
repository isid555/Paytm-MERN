import Header from "./components/Header.jsx";
import SubHeader from "./components/SubHeader.jsx";
import InputBox from "./components/InputBox.jsx";
import ButtonComponent from "./components/ButtonComponent.jsx";
import BottomWarning from "./components/BottomWarning.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";


function Signup(){

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Header label={"Sign up"}/>
                <SubHeader label={"Enter your infromation to create an account"}/>
                <InputBox placeholder="Albert" label={"First Name"} onchange={e =>{
                    setFirstName(e.target.value);
                }}/>
                <InputBox placeholder="Einstein" label={"Last Name"} onchange={e =>{
                    setLastName(e.target.value);
                }}/>
                <InputBox placeholder="Username" label={"Username"} onchange={e=>{
                    setUsername(e.target.value);
                }}/>
                <InputBox placeholder="123456" label={"Password"} onchange={e =>{
                    setPassword(e.target.value);
                }}/>
                <div className="pt-4">
                    <ButtonComponent label={"Sign up"} onClick={async() => {
                        const response  = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,firstName,lastName,password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard")
                    }}/>
                </div>
                <BottomWarning label={"Already have an account?"} linkText={"Sign in"} link={"/signin"}/>
            </div>
        </div>
    </div>

)
}

export default Signup;
