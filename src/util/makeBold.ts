import { ProfileDocument } from '../models/Profile'

const boldString = (word: string, text: string) => {
  const pattern = `(\\s|\\b)(${word})(\\s|\\b)`
  const regexp = new RegExp(pattern, 'ig') // ignore case (optional) and match all
  const replaceMask = '$1<b>$2</b>$3'
  
  return text.replace(regexp, replaceMask)
}

const makeBold = (query: string, profiles: ProfileDocument[]) => profiles.map(profile => {
  const transformedProfile = profile

  let newDescription = profile.descriptionOriginal.length > 50 ? profile.descriptionOriginal.substring(0, 500) + '...' : profile.descriptionOriginal

  query.split(' ').filter(queryWord => queryWord.length > 3).forEach(queryWord => {
    newDescription = boldString(queryWord, newDescription)
  })
  transformedProfile['descriptionOriginal'] = newDescription
  return transformedProfile
})

export default makeBold