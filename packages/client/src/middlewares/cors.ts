import { cors } from '@elysiajs/cors'

export const corsMiddleware = cors({
  origin: ['https://chattutor.app', 'https://*.chattutor.app', 'http://localhost:8001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})