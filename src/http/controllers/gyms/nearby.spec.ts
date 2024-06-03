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

  it('should be able to list nearby gyms ', async () => {
    
    const {token} = await createAndAuthenticateUser(app,true)


    
    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title:'OI Gym',
      description: 'Some description',
      phone: '14996112228',
      latitude:-23.546681,
      longitude: -47.187582,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title:'oI Gym',
      description: 'Some description',
      phone: '14996112228',
      latitude:-23.5505312,
      longitude:  -47.0888562,
    })

    

    const response = await request(app.server)
    .get('/gyms/nearby')
    .query({
      latitude:-23.546681,
      longitude: -47.187582,
    })
    .set('Authorization', `Bearer ${token}`)
    .send()
    
   

    expect(response.statusCode).toEqual(201)


 
  
  })
})