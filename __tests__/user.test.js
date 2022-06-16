const supertest = require("supertest");
const app = require('../app')
const { mongoConnect, mongoDisconnect } = require("../services/mongo.service");
const { getTestUser } = require("../utils/testUtils/auth.util");


jest.setTimeout(30 * 1000)

describe('USER controller', () => {

    beforeAll(async () => {
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect()
    });

    const testUser = { 
        name: 'test user', 
        email: 'test@example.com', 
        password: 'password', 
        confirmPassword: 'password'
    }

    it('throws returns 400 if the user exists on signup', async () => {
        await supertest(app)
            .post('/api/user/signup')
            .send(testUser)
            .expect(400)
    })

    it('signs up new users and returns 201', async () => {
        await supertest(app)
            .post('/api/user/signup')
            .send({ ...testUser, email: `test-${Math.random()}@example.com` })
            .expect(201)
    })

    it('can login users and returns 200', async () => {
        await supertest(app)
            .post('/api/user/login')
            .send(testUser)
            .expect(200)
    })

    it('sends forgot password link to users email and returns 200', async () => {
        await supertest(app)
            .post('/api/user/forgotPassword')
            .send(testUser)
            .expect(200)
    })

    it('gets a user and returns 200', async () => {
        const getTestUserData = await getTestUser()
        const getTestUserBody = getTestUserData._body

        const response = await supertest(app)
            .get('/api/user/getLoggedInUser')
            .set({ Authorization: `Bearer ${getTestUserBody.token}` })
            .expect(200)

        expect(response.body).toMatchObject(getTestUserBody.result)
    })
})