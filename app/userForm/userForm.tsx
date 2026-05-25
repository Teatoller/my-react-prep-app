import { useState } from "react"
// For each of these components, how would you refactor the logic to separate concerns and make the code more reusable? Consider creating custom hooks where appropriate!

export function UserForm() {
    const [formData, setFormData] = useState({
        userName: '',
        email: ''
    })
    const [errors, setErrors] = useState({
        email: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
        
        // Clear email error when user starts typing
        if (name === 'email') {
            setErrors({ email: '' })
        }
    }

    const validateEmail = (email: string): boolean => {
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() // Prevent page reload
        
        // Validate email
        if (!validateEmail(formData.email)) {
            setErrors({ email: 'Please enter a valid email address (e.g., name@example.com)' })
            return
        }
        
        // If validation passes, submit the form
        console.log('Form submitted:', formData)
        alert('Form submitted successfully!')
        
        // Optional: Reset form after submission
        // setFormData({ userName: '', email: '' })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName">Username:</label>
                <input 
                    type="text" 
                    name="userName" 
                    value={formData.userName}
                    onChange={handleChange} 
                    placeholder="Username"
                />
            </div>
            
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
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