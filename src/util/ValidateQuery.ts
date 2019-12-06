import {check} from 'express-validator'

export const unstructuredValidationRules = () => [
  check('query').exists().custom(query => true)
]

export const structuredValidationRules = () => [
  check('query').exists().custom(query => true)
]