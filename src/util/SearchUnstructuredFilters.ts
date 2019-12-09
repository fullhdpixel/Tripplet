import { Query } from '../models/Query'
import { Profile, ProfileDocument } from '../models/Profile'
import makeBold from './makeBold'

const SearchUnstructuredFilters = (filters: any, ipAddress: string, callback: Function) => {
  const newQuery = new Query({
    query: filters.q,
    filters: JSON.stringify(filters),
    ipAddress
  })
  newQuery.save()

  const query = filters.q
  delete filters.q

  const mongoTextQuery = query && query.length > 0 ? { $text: { $search: query } } : {}

  console.log(mongoTextQuery)
  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.find({...filters, ...mongoTextQuery}, {}, {limit: 10}, (err: any, profiles: ProfileDocument[]) => {
    // const profiles: ProfileDocument[] = dbResults.hits.hits
    
    if (!profiles || profiles.length === 0) {
      callback([])
    } else {
      callback(makeBold(query, profiles))
    }
  })

  // // @ts-ignore all
  // // eslint-disable-next-line @typescript-eslint/camelcase
  // Profile.find({...filters}, {}, {limit: 10}, (err: any, profiles: ProfileDocument[]) => {
  //   callback(profiles)
  // })
}

export default SearchUnstructuredFilters