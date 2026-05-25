import { useState } from "react"

export function UseLocalStorage() {
    const [value, setValue] = useState(() => {
        // localStorage.getItem is not a function in server-side rendering, so we need to check if we're in a browser environment
        if (typeof window === 'undefined') {
            return ''
        }   
        const storedValue = localStorage.getItem('myKey')
        return storedValue ? JSON.parse(storedValue) : ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        localStorage.setItem('myKey', JSON.stringify(newValue))
    }

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div>
                <h1>Use Local Storage</h1>
                <input 
                    type="text" 
                    value={value} 
                    onChange={handleChange} 
                    placeholder="Type something and it will be saved to local storage"
                    className="border p-2 mt-4"
                />
            </div>
        </main>
    )
}