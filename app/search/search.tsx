import { useState, useEffect, useRef } from 'react'

interface SearchResult {
    id: number
    title: string
}

// For each of these components, how would you refactor the logic to separate concerns and make the code more reusable? Consider creating custom hooks where appropriate!

export function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [debouncedTerm, setDebouncedTerm] = useState('')

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm)
        }, 500) // Wait 500ms after user stops typing

        // Cleanup function - clears timeout if searchTerm changes before 500ms
        return () => clearTimeout(timer)
    }, [searchTerm])

    // Search effect (runs when debounced term changes)
    useEffect(() => {
        if (debouncedTerm) {
            performSearch(debouncedTerm)
        } else {
            setResults([])
        }
    }, [debouncedTerm])

    const performSearch = async (query: string) => {
        setIsLoading(true)
        try {
            // Simulate API call
            const mockResults = await mockSearchAPI(query)
            setResults(mockResults)
        } catch (error) {
            console.error('Search failed:', error)
            setResults([])
        } finally {
            setIsLoading(false)
        }
    }

    // Mock API function (replace with real API call)
    const mockSearchAPI = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockData = [
                    { id: 1, title: 'Apple' },
                    { id: 2, title: 'Banana' },
                    { id: 3, title: 'Cherry' },
                    { id: 4, title: 'Date' },
                    { id: 5, title: 'Elderberry' }
                ]
                
                const filtered = mockData.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                )
                resolve(filtered)
            }, 300) // Simulate network delay
        })
    }

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            
            {isLoading && <div className="loading">Searching...</div>}
            
            {!isLoading && debouncedTerm && results.length === 0 && (
                <div className="no-results">No results found for "{debouncedTerm}"</div>
            )}
            
            <ul className="results-list">
                {results.map(result => (
                    <li key={result.id}>{result.title}</li>
                ))}
            </ul>
        </div>
    )
}