import { useState } from "react";
import "./Form.css";

export default function SignupPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        //  Clear field error while user is typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    const validate = () => {
        const newErrors = {};

        // Name Validator
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 1) {
            newErrors.name = "Name must be at least 1 characters";
        }

        // Email Validator
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        // Password Validator
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Confirm Password Validator
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const vaidationErrors = validate();

        if (Object.keys(vaidationErrors).length > 0) {
            setErrors(vaidationErrors);
            setSubmitted(false);
            return;
        }

        setErrors({});

        setSubmitted(true);

        console.log("Form submitted successfully:", formData);

    }


    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2> Create Account </h2>
            <div className="form-group">

                {/* Name Field */}
                <label htmlFor="Name">Name</label>
                <input
                    type="text"
                    id="Name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    value={formData.name}
                />
                {errors.name && <span className="error">{errors.name}</span>}


                {/* Email Field */}
                <label htmlFor="Email">Email</label>
                <input
                    type="email"
                    id="Email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                />
                {errors.email && <span className="error">{errors.email}</span>}

                {/* Password Field */}
                <label htmlFor="Password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                />
                {errors.password && <span className="error">{errors.password}</span>}

                {/* Confirm Password Field */}
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

            </div>

            <div className="form-group">
                <button type="submit">Submit</button>

                {submitted && <span className="success">Form submitted successfully!</span>}
            </div>
        </form>
    )
}
