import { useState } from "react"
// For each of these components, how would you refactor the logic to separate concerns and make the code more reusable? Consider creating custom hooks where appropriate!

export function User() {
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        email: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))

        // Clear only the relevant error when user starts typing
        if (name === 'email') {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }))
        }
        if (name === 'username') {
            setErrors((prevErrors) => ({ ...prevErrors, username: '' }))
        }
    }

    const validateEmail = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(formData.email)
    }

    const validateUsername = (): boolean => {
        // Username: 3-20 characters, only letters, numbers, and underscores
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
        return usernameRegex.test(formData.username)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let isValid = true
        const newErrors = { username: '', email: '' }

        // Validate username
        if (!validateUsername()) {
            newErrors.username = 'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.'
            isValid = false
        }

        // Validate email
        if (!validateEmail()) {
            newErrors.email = 'Please enter a valid email address (e.g., name@example.com)'
            isValid = false
        }

        setErrors(newErrors)

        // Only submit if all validation passes
        if (isValid) {
            console.log('Form submitted successfully:', formData)
            alert('Form submitted!')
            // Optional: Reset form
            // setFormData({ username: '', email: '' })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"  // Fixed: was "user"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                {errors.username && <p style={{ color: 'red', fontSize: '14px' }}>{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"  // Fixed: was "emil"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}