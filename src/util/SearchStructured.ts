import { Profile, ProfileDocument } from '../models/Profile'

const SearchStructured = (query: string, callback: Function) => {
  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  //...query
  Profile.find({}, {}, {limit: 10}, (err: any, profiles: ProfileDocument[]) => {
    callback(profiles)
  })
}

export default SearchStructured