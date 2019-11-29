import fs from 'fs'
import { Request, Response } from 'express'
import { Client } from '@elastic/elasticsearch'
import parse from 'csv-parse'

import { Profile, ProfileDocument } from '../models/Profile'
import {cleanDescription, cleanQuery} from '../util/dataCleaning'

const client = new Client({ node: 'http://localhost:9200' })

/**
 * GET /createProfiles
 * TODO describe what it does
 */
export const createProfiles = (req: Request, res: Response) => {
  const input = fs.readFileSync(__dirname + '/../../data/selection200.csv', 'utf8')

  // const input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"'
  parse(input, {
    delimiter: ';'
  }, (err, output) => {
    // Start at index 1, because the first row is solely keys
    // const ColumnKeys: ProfileAttribute[] = output[0]
    const ProfilesRaw = output.splice(1).map((row: any) => {
      // Only insert in DB if it does not exist yet
      Profile.findOne({id: row[0]}, (err, existingProfile) => {
        if (existingProfile) {
          console.log(existingProfile)
          return existingProfile
        } else {
          const profile = new Profile({
            id: row[0],
            age: row[1],
            diet: row[2],
            drinks: row[3],
            education: row[4],
            job: row[5],
            religion: row[6],
            sex: row[7],
            smokes: row[8],
            description: cleanDescription(row[9])
          })
          profile.save()
          profile.on('es-indexed', (err,res) => {
            if (err) {
              // console.log(err)
            } else {
              // console.log('success', res)
            }
          })

          return profile
        }
      })
    })

    return res.send({ProfilesRaw})
  })

}
/**
 * POST /matches
 * Query for matches
 * Hydrate: true (adds mongodb entry) but loses relevancy score
 */
export const retrieveMatches = (req: Request, res: Response) => {
  const query = cleanQuery(req.body.query)

  // @ts-ignore all
  Profile.search({
    // eslint-disable-next-line @typescript-eslint/camelcase
    query_string: {
      query
    }
  }, (err: any, profiles: ProfileDocument[]) => { 
    return res.send({profiles})
  })
}