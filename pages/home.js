import { useState } from "react"
import ProgressBar from "../components/ProgressBar"

const Home = () => {
    const [layout, setLayout] = useState("up-and-down")
    const [typedResponse, setTypedResponse] = useState("")
    const toType = "This is a random block of text for the purpose of developing the web application. I hope you enjoy trying this out, cheers."

    const onTextareaChange = (e) => {
        if (e.target.value[e.target.value.length - 1] === toType[e.target.value.length - 1] && e.target.value.length - typedResponse.length === 1) {
            setTypedResponse(e.target.value)
        }
    }

    const layoutColumns = layout.includes("up-and-down") ? "grid-cols-1" : "grid-cols-2";
    const layoutOrder = layout.includes("reverse") ? "order-last" : "";

    return (
        <div>
            <div>
                <label>Layout: 
                    <select onChange={e => setLayout(e.target.value)} value={layout}>
                        <option value="up-and-down">Up and down</option>
                        <option value="side-by-side">Side by side</option>
                        <option value="up-and-down-reverse">Up and down reverse</option>
                        <option value="side-by-side-reverse">Side by side reverse</option>
                    </select>
                </label>

                <div className={`grid gap-4 ${layoutColumns}`}>
                    <p className={layoutOrder}>{toType}</p>
                    <textarea onChange={onTextareaChange} value={typedResponse} className="border border-red-400" />
                </div>

                <ProgressBar width={`${Math.floor((typedResponse.length / toType.length) * 100)}%`} />
            </div>
        </div>
    )
}

export default Home