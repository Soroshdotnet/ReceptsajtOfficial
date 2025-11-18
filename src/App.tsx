import {Outlet} from "react-router-dom";

function App() {

    return (
        <main className="min-h-screen bg-linear-to-b from-background to-background/50 p-8 mx-auto">
            <div className="max-w-xl mx-auto just">
                <Outlet/>
            </div>
        </main>
    )
}

export default App
