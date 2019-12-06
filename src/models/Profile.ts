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
  age: Number,
  diet: String,
  drinks: String,
  education: String,
  ethnicity: String,
  height: String,
  income: Number,
  job: String,
  orientation: String,
  pets: String,
  religion: String,
  sex: String,
  smokes: String,
  status: String,
  description: {
    type: String,
    // eslint-disable-next-line @typescript-eslint/camelcase
    es_indexed:true
  }
})

profileSchema.plugin(mongoosastic, {hydrate: true})

export type ProfileDocument = mongoose.Document & Profile
export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema)

// @ts-ignore all
// const stream = Profile.synchronize()
// let count = 0
// stream.on('data', (err: any, doc: any) => {
//   count++
// })
// stream.on('close', () => {
//   console.log('indexed ' + count + ' documents!')
// })
// stream.on('error', (err: any) => {
//   console.log(err)
// })