function BottomWarning({label ,linkText,link}){
    return(
        <div>
            <>
                {label}
            </>
            <div className={"inline text-2xl text-red-950 pointer underline pl-1 cursor-pointer"}>

                <a href={link}>{linkText}</a>
            </div>
        </div>
    )

}

export default BottomWarning;
