import { Request, Response } from 'express'
import SearchStructured from '../util/SearchStructured'
import { ProfileDocument } from '../models/Profile'

/**
 * GET /
 * Search page
 */
export const structured = (req: Request, res: Response) => {
  if (req.query.q) {
    const query = req.query.q
    SearchStructured(query, (profiles: ProfileDocument[]) => {
      console.log(profiles)
      return res.render('results', {
        result: profiles
      })
    })
  } else {
    res.render('home', {
      title: 'Structured'
    })
  }
}