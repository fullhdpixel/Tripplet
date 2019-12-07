import fs from 'fs'
import {Request, Response} from 'express'
// import { Client } from '@elastic/elasticsearch'
import parse from 'csv-parse'
// @ts-ignore all
// eslint-disable-next-line @typescript-eslint/camelcase
import random_name from 'node-random-name'

import {Profile, ProfileDocument} from '../models/Profile'
import {cleanDescription, cleanQuery, cleanLinks, cleanCapitalization} from '../util/dataCleaning'
import SearchUnstructured from '../util/SearchUnstructured'
import SearchStructured from '../util/SearchStructured'

// const client = new Client({ node: 'http://localhost:9200' })

const parseAndInsertCSV = (fileName: string) => {
  const input = fs.readFileSync(fileName, 'utf8')

  parse(input, {
    delimiter: ';'
  }, (err, output) => {
    // Start at index 1, because the first row is solely keys
    // const ColumnKeys: ProfileAttribute[] = output[0]

    const profiles = output.splice(1).map((row: any) => {
      // Only insert in DB if it does not exist yet
      console.log('create profile', row[0]) 
      const profile = new Profile({
        id: row[0],
        age: row[1],
        diet: row[2],
        drinks: row[3],
        education: row[4],
        ethnicity: row[5],
        height: row[6].toString(),
        job: row[8],
        orientation: row[9],
        religion: row[11],
        sex: row[12],
        smokes: row[13],
        status: row[14],
        description: cleanCapitalization(cleanDescription(row[15])),
        descriptionOriginal: cleanCapitalization(cleanLinks(row[15])),
        name: random_name({gender: row[12] === 'm' ? 'male' : 'female', seed: row[0]})
      })
      return profile
    })

    Profile.insertMany(profiles, (err, docs: ProfileDocument[]) => {
      console.log('inserted many')
    })
  })
}

/**
 * GET /createProfiles
 * TODO describe what it does
 */
const numberOfDocuments = 1
export const createProfiles = (req: Request, res: Response) => {
  for (let i = 1; i < numberOfDocuments + 1; i++) {
    //profiles_batch_ 1  one
    const fileName = __dirname + `/../../data/profiles_batch_ ${i} .csv`
    parseAndInsertCSV(fileName)
    if (i === numberOfDocuments) {
      return res.send({success: true})
    }
  }
}

/**
 * POST /search
 * Unstructured query for Profiles
 */
export const searchProfiles = (req: Request, res: Response) => {
  const query = cleanQuery(req.body.query)

  SearchUnstructured(query, (profiles: ProfileDocument[]) => {
    return res.send({profiles})
  })
}

/**
 * POST /find
 * Structured query for Profiles
 */
export const findProfiles = (req: Request, res: Response) => {
  const query = req.body.query

  SearchStructured(query, (profiles: ProfileDocument[]) => {
    return res.send({profiles})
  })
}

/**
 * DELETE /profiles and remove them from elasticsearch
 */
export const deleteProfiles = (req: Request, res: Response) => {
  Profile.find({}, (err, profiles: ProfileDocument[]) => {
    profiles.forEach(profile => {
      profile.remove() // to unindex them / remove from elasticsearch
    })
    return res.send({success: true})
  })
}