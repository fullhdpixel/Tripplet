/* eslint-disable @typescript-eslint/camelcase */
import mongoose from 'mongoose'
// @ts-ignore all
import mongoosastic from 'mongoosastic'

import Profile from '../types/Profile'

const profileSchema = new mongoose.Schema({  
  id: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    es_indexed:true
  },
  diet: {
    type: String,
    es_indexed:true
  },
  drinks: {
    type: String,
    es_indexed:true
  },
  education: {
    type: String,
    es_indexed:true
  },
  ethnicity: {
    type: String,
    es_indexed:true
  },
  height: {
    type: String,
    es_indexed:true
  },
  job: {
    type: String,
    es_indexed:true
  },
  orientation: {
    type: String,
    es_indexed:true
  },
  religion: {
    type: String,
    es_indexed:true
  },
  sex: {
    type: String,
    es_indexed:true
  },
  smokes: {
    type: String,
    es_indexed:true
  },
  status: {
    type: String,
    es_indexed:true
  },
  description: {
    type: String,
    es_indexed:true
  },
  descriptionOriginal: String, // Not cleaned
  name: String
}, {timestamps: true})

profileSchema.plugin(mongoosastic, {hydrate: true})

export type ProfileDocument = mongoose.Document & Profile
export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema)

// @ts-ignore all
const stream = Profile.synchronize()
let count = 0
stream.on('data', (err: any, doc: any) => {
  count++
})
stream.on('close', () => {
  console.log('indexed ' + count + ' documents!')
})
stream.on('error', (err: any) => {
  console.log(err)
})