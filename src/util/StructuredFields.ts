export default [{
  type: 'number',
  name: 'age',
  label: 'Minimum age',
  value: 18,
  autofocus: true,
  query: (age: number) => ({
    'range' : {
      'age' : { 'gte' : age }
    }
  })
},{
  type: 'radio',
  name: 'sex',
  label: 'Gender',
  options: ['Female', 'Male'],
  query: (value: string) => ({
    'term': {
      'sex': value
    }
  })
},{
  type: 'select',
  name: 'diet',
  label: 'Diet',
  options: ['-', 'anything', 'vegetarian', 'vegan', 'kosher', 'halal', 'other'],
  query: (value: string) => ({
    'match': {
      'diet': value
    }
  })
},{
  type: 'radio',
  name: 'orientation',
  label: 'Orientation',
  options: ['straight', 'gay', 'bisexual'],
  query: (value: string) => ({
    'term': {
      'orientation': value
    }
  })
},{
  type: 'select',
  name: 'status',
  label: 'Status',
  options: ['-', 'single', 'seeing someone', 'married', 'in an open relationship'],
  query: (value: string) => ({
    'term': {
      'status': value
    }
  })
},{
  type: 'select',
  name: 'smokes',
  label: 'Smokes',
  options: ['-', 'no', 'yes', 'sometimes', 'when drinking', 'trying to quit'],
  query: (value: string) => ({
    'term': {
      'smokes': value
    }
  })
},{
  type: 'select',
  name: 'drinks',
  label: 'Drinks',
  options: ['-', 'socially', 'very often', 'often', 'rarely', 'desperately', 'not at all'],
  query: (value: string) => ({
    'term': {
      'drinks': value
    }
  })
},{
  type: 'select',
  name: 'ethnicity',
  label: 'Ethnicity',
  options: ['-', 'asian', 'middle eastern', 'black', 'native american', 'indian', 'pacific islander', 'hispanic/latin', 'white', 'other'],
  query: (value: string) => ({
    'match': {
      'ethnicity': value
    }
  })
},{
  type: 'number',
  name: 'height',
  label: 'Min. Height (Inches)',
  value: 0,
  query: (value: string) => ({
    'range' : {
      'height' : { 'gte' : value }
    }
  })
},{
  type: 'select',
  name: 'education',
  label: 'Education',
  options: ['-', 'high school', 'two-year college', 'university', 'masters program', 'law school', 'med school', 'Ph.D program', 'space camp'],
  query: (value: string) => ({
    'match': {
      'education': value
    }
  })
},{
  type: 'select',
  name: 'job',
  label: 'Job',
  options: ['-', 'student', 'art / music / writing', 'banking/finance', 'administration', 'technology', 'construction', 'education', 'entertainment / media', 'management', 'hospitality', 'law', 'medicine', 'military', 'politics / government', 'sales / marketing', 'science / engineering', 'transportation', 'unemployed', 'other', 'rather not say', 'retire'],
  query: (value: string) => ({
    'match': {
      'job': value
    }
  })
},{
  type: 'select',
  name: 'religion',
  label: 'Religion',
  options: ['-', 'agnosticism', 'atheism', 'Christianity', 'Judaism', 'Catholicism', 'Islam', 'Hinduism', 'Buddhism'],
  query: (value: string) => ({
    'term': {
      'religion': value
    }
  })
}]