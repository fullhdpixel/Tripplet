import { Profile, ProfileDocument } from '../models/Profile'

// Hydrate: true (adds mongodb entry) but loses relevancy score
const SearchUnstructured = (query: string, callback: Function) => {
  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.search({query_string: {query}}, {hydrate: true}, (err: any, profiles: ProfileDocument[]) => {
    console.log(profiles)
    callback(profiles)
  })
}

export default SearchUnstructured