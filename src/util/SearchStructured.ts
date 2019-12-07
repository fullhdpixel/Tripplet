import { Profile, ProfileDocument } from '../models/Profile'

const SearchStructured = (query: object, callback: Function) => {
  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.find({...query}, {}, {limit: 10}, (err: any, profiles: ProfileDocument[]) => {
    callback(profiles)
  })
}

export default SearchStructured