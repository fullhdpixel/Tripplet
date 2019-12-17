/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Query } from '../models/Query'
import { Profile, ProfileDocument } from '../models/Profile'
import makeBold from './makeBold'
import generateElasticFilters from './generateElasticFilters'

const SearchUnstructuredFilters = (filters: any, ipAddress: string, callback: Function) => {
  const newQuery = new Query({
    query: filters.q,
    filters: JSON.stringify(filters),
    ipAddress
  })
  newQuery.save()

  const query = filters.q
  delete filters.q

  const elasticQuery = generateElasticFilters(query, filters)

  // @ts-ignore all
  // eslint-disable-next-line @typescript-eslint/camelcase
  Profile.esSearch(elasticQuery, {hydrate: true, size: 10}, (err: any, dbResults: any) => {
    if (err || !dbResults) {
      return callback([])
    }
    const profiles: ProfileDocument[] = dbResults.hits.hits
    callback(makeBold(query, profiles))
  })
}

export default SearchUnstructuredFilters