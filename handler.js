'use strict'
import { createServer, proxy } from 'aws-serverless-express'
import app from './app.js'
const server = createServer(app)


export const api = (event, context) =>  { proxy(server, event, context) }
