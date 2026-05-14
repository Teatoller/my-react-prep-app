import { useState } from "react"

export function BasicCounter() {
    const [count, setCount] = useState(0)
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div>
                <h1>Counter</h1>
                <p> You have clicked {count} times</p>
                <div className="group flex items-center gap-3 ">
                    <button onClick={() => setCount(count + 1)} >Click me</button>
                    <button onClick={() => setCount(0)}>Reset</button>
                </div>
            </div>
        </main>
    )
}