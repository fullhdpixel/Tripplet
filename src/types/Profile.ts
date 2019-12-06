type Drinks = 'very often' | 'often' | 'socially' | 'rarely' | 'desperately' | 'not at all'
type Ethnicity = 'Asian' | 'middle eastern' | 'black' | 'native American' | 'indian' | 'pacific islander' | 'Hispanic/latin' | 'white' | 'other'
type Income = -1 | 20000 | 30000 | 40000 | 50000 | 60000 | 70000 | 80000 | 100000 | 150000 | 250000 | 500000 | 1000000
type Job = 'student' | 'art/music/writing' | 'banking/finance' | 'administration' | 'technology' | 'construction' | 'education' | 'entertainment/media' | 'management' | 'hospitality' | 'law' | 'medicine' | 'military' | 'politics/government' | 'sales/marketing' | 'science/engineering' | 'transportation' | 'unemployed' | 'other' | 'rather not say' | 'retire'
type Orientation = 'straight' | 'gay' | 'bisexual'
type Sex = 'm' | 'f'
type Smokes = 'yes' | 'sometimes' | 'when drinking' | 'trying to quit' | 'no'
type Status = 'single' | 'seeing someone' | 'married' | 'in an open relationship'

interface Profile {
  id: string,
  age: number,
  diet: string,
  drinks: Drinks,
  education: string,
  ethnicity: Ethnicity,
  height: number,
  income: Income,
  job: Job,
  orientation: Orientation,
  pets: string,
  religion: string,
  sex: Sex,
  smokes: Smokes,
  status: Status,
  description: string
  search: Function
}

export default Profile