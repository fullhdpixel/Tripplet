import { Query } from '../models/Query'
import { Profile, ProfileDocument } from '../models/Profile'

const boldString = (word: string, text: string) => {
  const pattern = `(\\s|\\b)(${word})(\\s|\\b)`
  const regexp = new RegExp(pattern, 'ig') // ignore case (optional) and match all
  const replaceMask = '$1<b>$2</b>$3'
  
  return text.replace(regexp, replaceMask)
}

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
    const profiles: ProfileDocument[] = dbResults.hits.hits
    
    const results = profiles.map(profile => {
      const transformedProfile = profile

      let newDescription = profile.descriptionOriginal.length > 50 ? profile.descriptionOriginal.substring(0, 500) + '...' : profile.descriptionOriginal

      query.split(' ').filter(queryWord => queryWord.length > 3).forEach(queryWord => {
        newDescription = boldString(queryWord, newDescription)
        if (profile.name === 'Marianne Kyler') {
          console.log(queryWord)
          console.log(newDescription)
        }
      })
      transformedProfile['descriptionOriginal'] = newDescription
      return transformedProfile
    })

    callback(results)
  })
}

export default SearchUnstructured