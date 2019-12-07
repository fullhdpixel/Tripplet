export default [{
  type: 'number',
  name: 'age',
  label: 'Minimum age',
  value: 18,
  autofocus: true
},{
  type: 'radio',
  name: 'sex',
  label: 'Gender',
  options: ['Female', 'Male']
},{
  type: 'select',
  name: 'diet',
  label: 'Diet',
  options: ['anything', 'vegetarian', 'vegan', 'kosher', 'halal', 'other']
},{
  type: 'radio',
  name: 'orientation',
  label: 'Orientation',
  options: ['straight', 'gay', 'bisexual']
},{
  type: 'select',
  name: 'status',
  label: 'Status',
  options: ['single', 'seeing someone', 'married', 'in an open relationship']
},{
  type: 'select',
  name: 'smokes',
  label: 'Smokes',
  options: ['no', 'yes', 'sometimes', 'when drinking', 'trying to quit']
},{
  type: 'select',
  name: 'drinks',
  label: 'Drinks',
  options: ['socially', 'very often', 'often', 'rarely', 'desperately', 'not at all']
},{
  type: 'select',
  name: 'ethnicity',
  label: 'Ethnicity',
  options: ['asian', 'middle eastern', 'black', 'native american', 'indian', 'pacific islander', 'hispanic/latin', 'white', 'other']
},{
  type: 'number',
  name: 'height',
  label: 'Min. Height (Inches)',
  value: 50,
},{
  type: 'select',
  name: 'job',
  label: 'Job',
  options: ['-', 'student', 'art / music / writing', 'banking/finance', 'administration', 'technology', 'construction', 'education', 'entertainment / media', 'management', 'hospitality', 'law', 'medicine', 'military', 'politics / government', 'sales / marketing', 'science / engineering', 'transportation', 'unemployed', 'other', 'rather not say', 'retire'],
},{
  type: 'select',
  name: 'religion',
  label: 'Religion',
  options: ['-', 'agnosticism', 'atheism', 'Christianity', 'Judaism', 'Catholicism', 'Islam', 'Hinduism', 'Buddhism'],
}]