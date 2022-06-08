'use strict';
const { app } = require('../src/server');  
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/models/index');

// before any of the test create a connection
beforeAll(async () => {
    await db.sync();
});

describe('Web server', () => {
    // Check if 404 is handled 

    it('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });

    // test if can create a food
    it('can add a food', async () => {
        const response = await mockRequest.post('/food').send({
           name: 'sweet',
           price: '10'
        });
        expect(response.status).toBe(201);
    });

    // test if can read all food 
    it('can get all food', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);

    });

    //test if can read one food
    it('can get one record', async () => {
        const response = await mockRequest.get('/food/1');
        expect(response.status).toBe(200);
    });

    // test if can update a food
    it('can update a record', async () => {
        const response = await mockRequest.put('/food/1');
        expect(response.status).toBe(201);
    });
    // test if can delete a food
    it('can delete a record', async () => {
        const response = await mockRequest.delete('/food/1');
        expect(response.status).toBe(204);
    });
});
// after all the tests are done
afterAll(async () => {
    await db.drop();
});