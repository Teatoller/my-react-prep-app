import { useState } from "react"

export function Counter() {
    const [count, setCount] = useState(0)
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
            <div className="relative">
                {/* Animated Background Blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-0 -right-20 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                
                {/* Main Counter Card */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all hover:scale-105 duration-300">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg animate-bounce">
                            <span className="text-4xl">🎯</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Counter
                        </h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Count Display */}
                    <div className="text-center mb-8">
                        <p className="text-gray-600 text-lg mb-2 font-medium">
                            You have clicked
                        </p>
                        <div className="relative inline-block">
                            <div className={`text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${count !== 0 ? 'animate-pulse' : ''}`}>
                                {count}
                            </div>
                            {count > 0 && (
                                <div className="absolute -top-2 -right-6 text-2xl animate-bounce">
                                    🎉
                                </div>
                            )}
                            {count < 0 && (
                                <div className="absolute -top-2 -right-6 text-2xl animate-pulse">
                                    😅
                                </div>
                            )}
                        </div>
                        <p className="text-gray-500 mt-2 font-medium">
                            time{count !== 1 ? 's' : ''}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                                style={{ 
                                    width: `${Math.min(Math.abs(count) * 10, 100)}%`,
                                    backgroundColor: count < 0 ? '#ef4444' : undefined
                                }}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {/* Primary Buttons Group */}
                        <div className="grid grid-cols-3 gap-3">
                            <button 
                                onClick={() => setCount(count - 1)}
                                className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl text-lg"
                            >
                                -1
                            </button>
                            
                            <div className="grid grid-cols-2 gap-2 col-span-1">
                                <button 
                                    onClick={() => setCount(count + 1)}
                                    className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl text-lg"
                                >
                                    +1
                                </button>
                                <button 
                                    onClick={() => setCount(count + 5)}
                                    className="px-2 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl text-sm"
                                >
                                    +5
                                </button>
                            </div>
                            
                            <button 
                                onClick={() => setCount(count - 5)}
                                className="px-2 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl text-sm"
                            >
                                -5
                            </button>
                        </div>

                        {/* Special Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setCount(Math.floor(Math.random() * 100) - 50)}
                                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
                            >
                                🎲 Random
                            </button>
                            
                            <button 
                                onClick={() => setCount(count * 2)}
                                className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
                            >
                                ⚡ Double
                            </button>
                        </div>

                        {/* Reset Button */}
                        <button 
                            onClick={() => setCount(0)}
                            className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
                        >
                            🔄 Reset
                        </button>
                    </div>

                    {/* Achievement Messages */}
                    {count === 10 && (
                        <div className="mt-6 p-3 bg-yellow-100 border border-yellow-300 rounded-lg animate-bounce">
                            <p className="text-yellow-800 text-sm font-medium text-center">
                                🏆 You reached 10! Keep going! 🏆
                            </p>
                        </div>
                    )}
                    
                    {count === 25 && (
                        <div className="mt-6 p-3 bg-purple-100 border border-purple-300 rounded-lg animate-bounce">
                            <p className="text-purple-800 text-sm font-medium text-center">
                                ⭐ Amazing! 25 clicks! You're on fire! ⭐
                            </p>
                        </div>
                    )}
                    
                    {count === 50 && (
                        <div className="mt-6 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg animate-bounce">
                            <p className="text-sm font-medium text-center">
                                👑 LEGENDARY! 50 clicks! You're a champion! 👑
                            </p>
                        </div>
                    )}

                    {count === -10 && (
                        <div className="mt-6 p-3 bg-blue-100 border border-blue-300 rounded-lg animate-pulse">
                            <p className="text-blue-800 text-sm font-medium text-center">
                                ❄️ Going negative, feeling chilly! ❄️
                            </p>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="text-center mt-6 text-white/80 text-sm">
                    <p>💡 Tip: Try the Random or Double buttons for fun!</p>
                </div>
            </div>
        </main>
    )
}