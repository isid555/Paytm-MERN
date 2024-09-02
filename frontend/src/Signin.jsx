import Header from "./components/Header.jsx";
import SubHeader from "./components/SubHeader.jsx";
import InputBox from "./components/InputBox.jsx";
import ButtonComponent from "./components/ButtonComponent.jsx";
import BottomWarning from "./components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



return(
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Header label={"Sign in"}/>
                <SubHeader label={"Enter your credentials to access your account"}/>
                <InputBox placeholder="albert@gmail.com" label={"Email"} onchange={e =>{
                    setUsername(e.target.value);
                }}/>
                <InputBox placeholder="123456" label={"Password"} onchange={e=>{
                    setPassword(e.target.value);
                }}/>
                <div className="pt-4">
                    <ButtonComponent label={"Sign in"} onClick={async () =>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                           username,password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }}/>
                </div>
                <BottomWarning label={"Don't have an account?"} linkText={"Sign up"} link={"/signup"}/>
            </div>
        </div>
    </div>
)
}

export default Signin;
