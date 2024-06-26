import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms ', async () => {
    
    const {token} = await createAndAuthenticateUser(app)
    
    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title:'JavaScript Gym',
      description: 'Some description',
      phone: '14996112228',
      latitude:0,
      longitude:0,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title:'Ola Gym',
      description: 'Some description',
      phone: '14996112228',
      latitude:0,
      longitude:0,
    })

    

    const response = await request(app.server)
    .get('/gyms/search')
    .query({
      query: 'Ola',
    })
    .set('Authorization', `Bearer ${token}`)
    .send()
    
   

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title:'Ola Gym'
      })
      
    ])

 
  
  })
})