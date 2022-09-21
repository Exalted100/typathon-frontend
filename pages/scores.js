import Layout from "../components/Layout"

const Scores = () => {
    return (
        <Layout>
            <h1 className="font-bold text-center text-3xl my-8">HIGH SCORES</h1>
            <h2 className="font-bold text-center text-2xl my-4">Your Scores</h2>
            <div className="grid grid-cols-3 gap-8 pb-8 text-center">
                <div>
                    <h3 className="font-bold text-xl">Sprint</h3>
                    <ol></ol>
                </div>

                <div>
                    <h3 className="font-bold text-xl">Middle Distance</h3>
                    <ol></ol>
                </div>

                <div>
                    <h3 className="font-bold text-xl">Marathon</h3>
                    <ol></ol>
                </div>
            </div>
            <h2 className="font-bold text-center text-2xl my-4">Global Scores</h2>
            <div className="grid grid-cols-3 gap-8 pb-8 text-center">
                <div>
                    <h3 className="font-bold text-xl">Sprint</h3>
                    <ol></ol>
                </div>

                <div>
                    <h3 className="font-bold text-xl">Middle Distance</h3>
                    <ol></ol>
                </div>

                <div>
                    <h3 className="font-bold text-xl">Marathon</h3>
                    <ol></ol>
                </div>
            </div>
        </Layout>
    )
}

export default Scores