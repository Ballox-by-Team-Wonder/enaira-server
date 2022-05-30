const app = require('../../app')
const supertest = require('supertest')

async function getTestUser() {
    const user = await supertest(app)
        .post(`/api/user/login`)
        .send({ email: 'test@example.com', password: 'password' })
    return user
}

module.exports = {
    getTestUser
}