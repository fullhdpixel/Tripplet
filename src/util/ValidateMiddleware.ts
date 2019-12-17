/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Request, Response, NextFunction} from 'express'
import {validationResult, ValidationError} from 'express-validator'

const ValidateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    // Add them to result to easily display it
    const result = {}
    const errorsArray = errors.array()
    errorsArray.forEach((error: ValidationError) => {
      // @ts-ignore
      result[error.param] = error.msg
    })

    return res.status(422).json({ errors: result })
  }
}

export default ValidateMiddleware

// Use this code to always generate errors
// const result = {}
// Object.keys(req.body).forEach((bodyKey) => {
//   // @ts-ignore
//   result[bodyKey] = `${bodyKey} error.msg`
// })
// return res.status(422).json({ errors: result })