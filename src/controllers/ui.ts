import { Request, Response } from 'express'
import moment from 'moment'
import requestIp from 'request-ip'

import { ProfileDocument, Profile } from '../models/Profile'
import SearchUnstructured from '../util/SearchUnstructured'
import SearchUnstructuredFilters from '../util/SearchUnstructuredFilters'
import StructuredFields from '../util/StructuredFields'
import { Query, QueryDocument } from '../models/Query'

/**
 * GET /
 * Search page
 */
export const unstructured = (req: Request, res: Response) => {
  if (req.query.q) {
    const startDate = new Date()

    const query = req.query.q
    const ipAddress = requestIp.getClientIp(req)

    SearchUnstructured(query, ipAddress, (profiles: ProfileDocument[]) => {
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
 * GET /
 * Search page
 */
export const unstructuredFilters = (req: Request, res: Response) => {
  if (req.query && Object.values(req.query).length > 0) {
    const startDate = new Date()

    const filters = {}
    Object.entries(req.query).forEach(queryItem => {
      const key = queryItem[0]
      let value: any = queryItem[1]

      if (value === '-') {
        return
      } else if (key == 'height' && value == 0) {
        return
      }
      if (key === 'sex') {
        value = value === 'Female' ? 'f' : 'm'
      } else if (key === 'age' || key === 'height') {
        value = { $gte: parseInt(value) }
      } else if (key === 'diet' || key === 'ethnicity' || key === 'education') {
        value = {$regex : `.*${value}.*`}
      }
      //@ts-ignore all
      filters[key] = value
    })

    // TODO type check filters
    const ipAddress = requestIp.getClientIp(req)
    SearchUnstructuredFilters(filters, ipAddress, (profiles: ProfileDocument[]) => {
      const endDate = new Date()
      const seconds = (endDate.getTime() - startDate.getTime()) / 1000

      return res.render('results', {
        profiles: profiles,
        seconds
      })
    })
  } else {
    res.render('unstructuredFilters', {
      title: 'Unstructured',
      fields: StructuredFields
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

      return res.render('profileDetail', {
        title: `Profile of ${profile.name}`,
        profile,
        indexedTime
      })
    }
  })
}

/**
 * GET /profile/:id
 * Profile Detail page
 */
export const redirectInterest = (req: Request, res: Response) => {
  const interest = req.query.i
  return res.redirect(`/?q=${interest}`)
}

/**
 * GET /queries
 * Returns all queries
 */
export const getQueries = (req: Request, res: Response) => {
  Query.find({}, (err: any, queries: QueryDocument[]) => {
    return res.render('queries', {
      queries
    })
  })
}