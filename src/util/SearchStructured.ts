import { Query, QueryDocument } from '../models/Query'
import { Profile, ProfileDocument } from '../models/Profile'

const SearchStructured = (filters: object, callback: Function) => {
  const newQuery = new Query({
    query: '',
    filters: JSON.stringify(filters) 
  })
  newQuery.save()

  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.find({...filters}, {}, {limit: 10}, (err: any, profiles: ProfileDocument[]) => {
    callback(profiles)
  })
}

export default SearchStructured