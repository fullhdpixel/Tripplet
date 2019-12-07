import { Profile, ProfileDocument } from '../models/Profile'

const boldString = (str: string, find: string) => {
  const re = new RegExp(find, 'g')
  console.log(str.replace(re, '<b>'+find+'</b>'))
  return str.replace(re, '<b>'+find+'</b>')
}

// Hydrate: true (adds mongodb entry) but loses relevancy score
const SearchUnstructured = (query: string, callback: Function) => {
  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.search({query_string: {query}}, {hydrate: true}, (err: any, profiles: any) => {
    const hits: ProfileDocument[] = profiles.hits.hits
    
    const results = hits.map(hit => {
      const transformedHit = hit

      let newDescription = hit.descriptionOriginal

      query.split(' ').forEach(queryWord => {
        newDescription = boldString(newDescription, queryWord)
      })
      transformedHit['descriptionOriginal'] = newDescription
      return transformedHit
    })

    callback(results)
  })
}

export default SearchUnstructured