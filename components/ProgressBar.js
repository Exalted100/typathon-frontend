const ProgressBar = ({width}) => {
    return (
        <div className="h-10 w-full border border-2 border-typathon-green relative rounded-full mt-12">
            <div className={`h-full bg-typathon-green rounded-full`} style={{"width": width}}></div>
            <p className="absolute top-2 left-1/2 font-semibold">{width !== "100%" ? width : "Complete"}</p>
        </div>
    )
}

export default ProgressBar