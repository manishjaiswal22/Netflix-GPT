const checkValidData = (name, email, password) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&])[A-Za-z0-9@#$%^&]{8,20}$/.test(password)
    const isNameValid = /^[a-zA-Z ]{3,20}$/.test(name)

    if (!isEmailValid || !isPasswordValid) return "Invalid email or password"
    if (!isNameValid) return "Invalid Name"

    return null

}

export default checkValidData