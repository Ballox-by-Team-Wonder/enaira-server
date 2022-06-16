const app = require('../app')
const { mongoConnect, mongoDisconnect } = require('../services/mongo.service')
const supertest = require("supertest");
const { getTestUser } = require('../utils/testUtils/auth.util');


jest.setTimeout(30 * 1000)

describe('MESSAGE controller', () => {
    let testUser;
    
    beforeAll(async () => {
        await mongoConnect()

        testUser = await getTestUser()
        // console.log(testUser._body.token)
    });

    afterAll(async () => {
        await mongoDisconnect()
    });

    const  memoryTestID = "628848fd2651bb3c326fdf5b"

    test("GET /api/messages", async () => {
        await supertest(app).get("/api/message/").expect(200)
    });

    test("GET /api/messages/memoryID", async () => {
        await supertest(app).get(`/api/message/${memoryTestID}`).expect(200)
    });

    test("POST /api/messages/memoryID", async () => {
        const testMessage = { body: "new message test" }
        const response = await supertest(app).post(`/api/message/${memoryTestID}`)
            .send(testMessage)
            .set({ Authorization: `Bearer ${testUser._body.token}` })
            .expect(201)

        expect(response.body).toMatchObject(testMessage)
    })
})