const checkValidData = (email, password, name = null) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&])[A-Za-z0-9@#$%^&]{8,20}$/.test(password);

    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid (Must be 8-20 characters with uppercase, lowercase, number & special character @#$%^&)";

    if (name !== null) {
        const isNameValid = /^[a-zA-Z ]{3,20}$/.test(name);
        if (!isNameValid) return "Name is not valid (Must be 3-20 characters)";
    }

    return null;
};

export default checkValidData;