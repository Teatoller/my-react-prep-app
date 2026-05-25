import { useEffect, useState } from "react"
// For each of these components, how would you refactor the logic to separate concerns and make the code more reusable? Consider creating custom hooks where appropriate!

export function DebounceSearch() {
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        setIsSearching(true)
        const timer = setTimeout(() => {
            if (query) {
                setSearchResults([
                    `${query} Result 1`,
                    `${query} Result 2`,
                    `${query} Result 3`
                ])
            } else {
                setSearchResults([])
            }
            setIsSearching(false)
        }, 500)

        return () => clearTimeout(timer)  // Only clear the timer
    }, [query])

    // adding a loading indicator while the user types

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="text-black-800 dark:text-gray-800">
                <h1>Debounce Search</h1>
                <p>Type in the search box to see debounced results.</p>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="border p-2 rounded"
                />
                {isSearching && <p className="text-gray-600 mt-2">Searching...</p>}
                <ul className="mt-4">
                    {searchResults.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}