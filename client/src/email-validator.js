function validateEmail(inputText){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return  emailRegex.test(inputText);
}

module.exports = validateEmail;