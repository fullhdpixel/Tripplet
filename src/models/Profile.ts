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
    type: Number
  },
  diet: {
    type: String
  },
  drinks: {
    type: String
  },
  education: {
    type: String
  },
  job: {
    type: String
  },
  religion: {
    type: String
  },
  sex: {
    type: String
  },
  smokes: {
    type: String
  },
  description: {
    type: String,
    // eslint-disable-next-line @typescript-eslint/camelcase
    es_indexed:true
  },
})

profileSchema.plugin(mongoosastic)

export type ProfileDocument = mongoose.Document & Profile
export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema)
// @ts-ignore all
// Profile.createMapping(function(err: any, mapping: any){  
//   if(err){
//     console.log('error creating mapping (you can safely ignore this)')
//     console.log(err)
//   }else{
//     console.log('mapping created!')
//     console.log(mapping)
//   }
// })