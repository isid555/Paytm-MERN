function InputBox({label,placeholder ,onchange}){
return(
    <div>
        <div className={"text-sm font-medium text-left py-2"}>
            {label}
        </div>
        <input type="text" placeholder={placeholder} onChange={onchange} className={"rounded border-slate-400  w-full px-2 py-1 border"}/>
    </div>
)

}
export default InputBox;