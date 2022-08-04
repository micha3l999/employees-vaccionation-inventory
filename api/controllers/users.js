var { ok, badRequest } = require('../utils/commonResponse');
var usersDB = require('../database/users.json');
const { VACCINATION_STATUS } = require('../utils/constants');
const { generateRandowPass, getUserCopy } = require('../utils/globalFuntions');

function getUsers(req, res) {
    const filters = req.query;
    const vaccinationStatus = filters.vaccinationStatus;
    const vaccineType = filters.vaccineType;
    const dateRange = filters.dateRange;
    console.log(req.query);
    const users = [];

    /* Return users with common role of user and filters */
    Object.values(usersDB).forEach((user) => {
        if (user.role != 'USER') {
            return
        }
        if (vaccinationStatus && user.vaccinationStatus != vaccinationStatus) {
            return
        }
        if (vaccineType && user.vaccineType != vaccineType) {
            return
        }
        users.push(user);
        
    });
    return ok(users, res);
}

function postUser(req, res) {
    const userId = req.body.identification;
    if (usersDB[userId]) {
        return badRequest('There is already a user with that identification', res);
    }
    const user = { ...req.body, role: "USER", dischargedPatiente: false, vaccinationStatus: VACCINATION_STATUS.NO_VACCINATED };
    usersDB[userId] = user;
    const userResponse = { ...req.body };
    return ok(userResponse, res);
}

function getUser(req, res) {
    const userId = req.params.identification ?? '';
    if (!userId) {
        return badRequest('There is no user id', res);
    }
    if (!usersDB[userId]) {
        return badRequest('There is no user with the id provided', res);
    }

    /* Create a deeply copy to delete the password of the response */
    const userCopy = JSON.stringify(usersDB[userId]);
    const user = JSON.parse(userCopy);
    delete user.password;
    return ok(user, res);
}

function postLogin(req, res) {
    const email = req.body.email ?? '';
    const password = req.body.password ?? '';
    
    const users = Object.values(usersDB);
    const user = users.find( user => user.email === email);

    /* If the user does not exist return */
    if (!user) {
        return badRequest('There is no user with the email provided', res);
    }
    
    if (user.password !== password) {
        return badRequest('Wrong Credentials', res);
    }

    const userCopy = JSON.stringify(user);
    const userResponse = JSON.parse(userCopy);
    delete userResponse.password;
    
    return ok(userResponse, res);
}

function putDischargePatiente(req, res) {
    const userId = req.params.identification;
    if (!userId) {
        return badRequest('There is no user id', res);
    }
    if (!usersDB[userId]) {
        return badRequest('There is no user with the id provided', res);
    }

    /* Discharge the patient to be able to log in */
    const user = usersDB[userId];
    user['dischargedPatiente'] = true;

    /* Generate randow pass */
    const password = generateRandowPass();
    user['password'] = password;

    return ok({
        identification: userId,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        password: user.password,
    }, res)
}

function postDischargePatiente(req, res) {
    const userId = req.body.identification;
    if (usersDB[userId]) {
        return badRequest('There is already a user with that identification', res);
    }
    const password = generateRandowPass();
    const user = { ...req.body, role: "USER", dischargedPatiente: true, vaccinationStatus: VACCINATION_STATUS.NO_VACCINATED, password };
    usersDB[userId] = user;
    const userResponse = { ...req.body, password}
    return ok(userResponse, res);
}

function putUser(req, res) {
    const userId = req.body.identification;
    if (!userId) {
        return badRequest('There is no user id', res);
    }
    if (!usersDB[userId]) {
        return badRequest('There is no user with the id provided', res);
    }

    usersDB[userId] = { ...usersDB[userId], ...req.body };
    return ok(getUserCopy(usersDB[userId]), res);
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    getUser,
    postLogin,
    putDischargePatiente,
    postDischargePatiente,
}

