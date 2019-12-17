/* eslint-disable @typescript-eslint/ban-ts-ignore */
import StructuredFields from './StructuredFields'

const generateElasticFilters = (query: string, filters: any) => {
  const filterQuery = Object.keys(filters).map((filterKey: string) => {
    const field = StructuredFields.find(field => field.name === filterKey)
    const value = filters[filterKey]

    // @ts-ignore all
    return field.query(value)
  })

  const elasticQuery = {
    'query': {
      'bool': {
        'must': [
          {
            'query_string': {
              query
            }
          },
          ...filterQuery
        ]
      }
    }
  }

  return elasticQuery
}

export default generateElasticFilters