import { Request, Response } from 'express'

import { ProfileDocument, Profile } from '../models/Profile'
import SearchUnstructured from '../util/SearchUnstructured'
import SearchStructured from '../util/SearchStructured'
import StructuredFields from '../util/StructuredFields'

/**
 * GET /
 * Search page
 */
export const structured = (req: Request, res: Response) => {
  console.log(req.query.age)
  if (req.query && Object.values(req.query).length > 0) {
    const startDate = new Date()

    const query = {}
    Object.entries(req.query).forEach(queryItem => {
      //@ts-ignore all
      query[queryItem[0]] = queryItem[1]
    })

    // TODO type check query

    SearchStructured(query, (profiles: ProfileDocument[]) => {
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
      return res.render('profileDetail', {
        title: 'Profile of name',
        profile
      })
    }
  })
}