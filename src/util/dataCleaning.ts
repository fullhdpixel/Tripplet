export const cleanDescription = (description: string) => description.toLowerCase().replace(/\d+/g, '').replace(/(<([^>]+)>)/ig,'').replace('&amp;','')

export const cleanQuery = (description: string) => description.toLowerCase().replace(/\d+/g, '')