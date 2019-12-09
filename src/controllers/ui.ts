import { Request, Response } from 'express'
import moment from 'moment'

import { ProfileDocument, Profile } from '../models/Profile'
import SearchUnstructured from '../util/SearchUnstructured'
import SearchStructured from '../util/SearchStructured'
import StructuredFields from '../util/StructuredFields'

/**
 * GET /
 * Search page
 */
export const structured = (req: Request, res: Response) => {
  if (req.query && Object.values(req.query).length > 0) {
    const startDate = new Date()

    const filters = {}
    Object.entries(req.query).forEach(queryItem => {
      const key = queryItem[0]
      let value: any = queryItem[1]

      if (value === '-') {
        return
      }
      if (key === 'sex') {
        value = value === 'Female' ? 'f' : 'm'
      } else if (key === 'age' || key === 'height') {
        value = { $gt: parseInt(value) }
      } else if (key === 'diet' || key === 'ethnicity' || key === 'education') {
        value = {$regex : `.*${value}.*`}
      }
      //@ts-ignore all
      filters[key] = value
    })

    // TODO type check filters
    SearchStructured(filters, (profiles: ProfileDocument[]) => {
      const endDate = new Date()
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000

      return res.render('results', {
        profiles,
        seconds
      })
    })
  } else {
    res.render('structured', {
      title: 'Structured',
      fields: StructuredFields
    })
  }
}

/**
 * GET /
 * Search page
 */
export const unstructured = (req: Request, res: Response) => {
  if (req.query.q) {
    const startDate = new Date()

    const query = req.query.q
    SearchUnstructured(query, (profiles: ProfileDocument[]) => {
      const endDate = new Date()
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000

      return res.render('results', {
        profiles,
        seconds
      })
    })
  } else {
    res.render('unstructured', {
      title: 'Unstructured'
    })
  }
}

/**
 * GET /profile/:id
 * Profile Detail page
 */
export const getProfileDetail = (req: Request, res: Response) => {
  const profileId = req.params.id

  Profile.findById(profileId, (err: any, profile: ProfileDocument) => {
    if (err || !profile) {
      return res.redirect('/')
    } else {
      // @ts-ignore all
      const indexedTime = moment(profile.createdAt).format('HH:mm DD-MM-YYYY')
      console.log(profile.name, indexedTime)

      return res.render('profileDetail', {
        title: `Profile of ${profile.name}`,
        profile,
        indexedTime
      })
    }
  })
}