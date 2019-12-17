/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Query } from '../models/Query'
import { Profile, ProfileDocument } from '../models/Profile'
import makeBold from './makeBold'

// Hydrate: true (adds mongodb entry) but loses relevancy score
const SearchUnstructured = (query: string, ipAddress: string, callback: Function) => {
  const newQuery = new Query({
    query,
    filters: null,
    ipAddress
  })
  newQuery.save()
  
  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.search({query_string: {query}}, {hydrate: true}, (err: any, dbResults: any) => {
    if (err || !dbResults) {
      return callback([])
    }
    const profiles: ProfileDocument[] = dbResults.hits.hits
    callback(makeBold(query, profiles))
  })
}

export default SearchUnstructured