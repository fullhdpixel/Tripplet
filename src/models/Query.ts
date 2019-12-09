import mongoose from 'mongoose'
import Query from '../types/Query'

const querySchema = new mongoose.Schema({  
  query: String,
  filters: Object,
  ipAddress: String
}, {timestamps: true})
export type QueryDocument = mongoose.Document & Query
export const Query = mongoose.model<QueryDocument>('Query', querySchema)