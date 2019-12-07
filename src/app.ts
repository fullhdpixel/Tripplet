import express from 'express'
import compression from 'compression' // compresses requests
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import bluebird from 'bluebird'
import {MONGODB_URI, SESSION_SECRET} from './util/secrets'

const MongoStore = mongo(session)

// Controllers (route handlers)
import * as uiController from './controllers/ui'
import * as profileController from './controllers/profile'
import validateMiddleware from './util/ValidateMiddleware'
import { unstructuredValidationRules, structuredValidationRules } from './util/ValidateQuery'

// Create Express server
const app = express()

// Connect to MongoDB
const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },)
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    // process.exit()
  })

// Express configuration

app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}))
app.use(flash())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
app.options('*', cors())

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}))

/**
 * View routes.
 */

app.get('/', uiController.unstructured)
app.get('/structured', uiController.structured)
app.get('/profile/:id', uiController.getProfileDetail)

// app.get('/signup', userController.getSignup)

/**
 * API routes.
 */
app.get('/createprofiles', profileController.createProfiles)
app.post('/search', unstructuredValidationRules(), validateMiddleware, profileController.searchProfiles)

app.post('/find', structuredValidationRules(), validateMiddleware, profileController.findProfiles)
app.delete('/profiles', profileController.deleteProfiles)

export default app