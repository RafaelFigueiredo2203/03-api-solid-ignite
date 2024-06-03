import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Checkin Metrics History(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list get the total count of check-ins  ', async () => {
    
    const {token} = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data:{
      title: 'JavaScript Gym',
      latitude:0,
      longitude: 0,
    }
    })
    
   await prisma.checkIN.createMany({
      data: [
        {
          gym_id:gym.id,
          userId:user.id,
        },
        {
          gym_id:gym.id,
          userId:user.id,
        }
      ],
    })

    const response = await request(app.server)
    .get('/check-ins/metrics')
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  
  })
})