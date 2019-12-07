export const cleanDescription = (description: string) => description.toLowerCase().replace(/\d+/g, '').replace(/(<([^>]+)>)/ig,'').replace('&amp;','')

export const cleanQuery = (description: string) => description.toLowerCase().replace(/\d+/g, '')

export const cleanLinks = (description: string) => description.replace(/<a\b[^>]*>/i,'').replace(/<\/a>/i, '')

export const cleanCapitalization = (description: string) => description.charAt(0).toUpperCase() + description.substring(1)