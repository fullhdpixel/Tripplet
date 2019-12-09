import mongoose from 'mongoose'
// @ts-ignore all
import mongoosastic from 'mongoosastic'

import Query from '../types/Query'

const querySchema = new mongoose.Schema({  
  query: String,
  filters: Object
}, {timestamps: true})
export type QueryDocument = mongoose.Document & Query
export const Query = mongoose.model<QueryDocument>('Query', querySchema)