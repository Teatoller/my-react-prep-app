import { useState } from "react"

// For each of these components, how would you refactor the logic to separate concerns and make the code more reusable? Consider creating custom hooks where appropriate!

export function ToggleMessage() {
    const [showHello, setShowHello] = useState(true);

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div>
                <h1>Toggle Message</h1>
                <p style={{ color: showHello ? 'blue' : 'red' }}>
                    {showHello ? 'Hello' : 'Goodbye'}
                </p>
                <button onClick={() => setShowHello(!showHello)}>
                    Toggle Message
                </button>
            </div>
        </main>
    )
}