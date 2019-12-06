import { Request, Response } from 'express'
import SearchUnstructured from '../util/SearchUnstructured'
import { ProfileDocument } from '../models/Profile'

/**
 * GET /
 * Search page
 */
export const unstructured = (req: Request, res: Response) => {
  if (req.query.q) {
    const query = req.query.q
    SearchUnstructured(query, (profiles: ProfileDocument[]) => {
      console.log(profiles)
      return res.render('results', {
        result: profiles
      })
    })
  } else {
    res.render('home', {
      title: 'Unstructured'
    })
  }
}