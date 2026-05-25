import { useState } from "react"

export function TogglePass() {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Toggle Password</h1>
                <button className="text-gray-600" onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? "Hide" : "Show"} Password
                </button>
                {isVisible ? <p className="mt-4 text-gray-600 dark:text-gray-300">Password123!</p>: <p className="mt-4 text-gray-600 dark:text-gray-300">******</p> }
            </div>
        </main>
    )
}