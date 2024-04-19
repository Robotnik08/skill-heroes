export function validateName (name) {
    const regex = /^[A-Za-z]+$/;

    if (!regex.test(name)) return false;

    return name;
}

export function validateEmail (email) {
    const regex = /^[A-Za-z@\.]+$/;

    if (!regex.test(email)) return false;

    return email;
}

export function ValidateDay (day) {
    if (day < 0 || isNaN(day) || day == null || day == undefined || day != (day | 0) || day > 6) {
        return false;
    }
    return day;
}

export function checkId (id, res) {
    if (id <= 0 || isNaN(id) || id == null || id == undefined || id != (id | 0)) {
        res.status(400).send("Error: Invalid id provided.");
        return false;
    }
    return true;
}