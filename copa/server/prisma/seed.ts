import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create user
  const user = await prisma.user.create({
    data: {
      nome: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/gabrielrodrigues-pd.png',
    }
  })
  // Create bolão
  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participant: {
        create: {
          userId: user.id,
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      data: '2022-11-03T13:10:11.510Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      data: '2022-11-20T13:10:11.510Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()