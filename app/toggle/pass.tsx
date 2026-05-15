import { useState } from "react"

export function TogglePass() {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div>
                <h1>Toggle Password</h1>
                <button onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? "Hide" : "Show"} Password
                </button>
                {isVisible ? <p className="mt-4">Password123!</p>: <p className="mt-4">******</p> }
            </div>
        </main>
    )
}