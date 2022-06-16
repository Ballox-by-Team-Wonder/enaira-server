const app = require('../app')
const { mongoConnect, mongoDisconnect } = require('../services/mongo.service')
const supertest = require("supertest");
const { getTestUser } = require('../utils/testUtils/auth.util');


jest.setTimeout(90 * 1000)

describe('MEMORY controller', () => {
    let testUser;
    
    beforeAll(async () => {
        await mongoConnect()

        testUser = await getTestUser()
    });

    afterAll(async () => {
        await mongoDisconnect()
    });

    test("GET /api/memories gets memories and returns 200", async () => {
        await supertest(app).get("/api/memory/").expect(200)
    });

    test('creates new memories and returns 201', async () => {
        const testMemory = { 
            title: 'test api title', 
            experience: 'test api experience', 
            isPublic: true,
            imageUrl: `${__dirname}/testImage.png`
        }

        await supertest(app)
            .post('/api/memory/')
            .field('title', testMemory.title)
            .field('experience', testMemory.experience)
            .field('isPublic', testMemory.isPublic)
            .attach('imageUrl', testMemory.imageUrl)
            .set({ Authorization: `Bearer ${testUser._body.token}` })
            .expect(201)
    })
})