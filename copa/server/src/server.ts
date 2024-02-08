import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { guessRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";

// Criando nosso servidor
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  // Configurando o cors
  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  await fastify.register(poolRoutes)
  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(userRoutes)
  
  // port
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()