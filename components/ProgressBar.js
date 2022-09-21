const ProgressBar = ({width}) => {
    return (
        <div className="h-10 w-full bg-typathon-grey relative">
            <div className={`h-full bg-typathon-green`} style={{"width": width}}></div>
            <p className="absolute top-2 left-1/2 font-semibold">{width !== "100%" ? width : "Complete"}</p>
        </div>
    )
}

export default ProgressBar