import { cors } from '@elysiajs/cors'

export const corsMiddleware = cors({
  origin: ['chattutor.app', '*.chattutor.app', 'http://localhost:8001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})