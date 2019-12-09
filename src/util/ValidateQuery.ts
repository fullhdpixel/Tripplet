import {check} from 'express-validator'

export const unstructuredValidationRules = () => [
  check('query').exists()
]

export const structuredValidationRules = () => [
  check('filters').exists()
]