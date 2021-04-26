import ApiUrls from '../constants/ApiUrls'
import querystring from 'querystring'

export default function GenerateHuxley2Url(service: string, urlParams?: string[], queryParams?: Record<string, string>): string {
  let queryString = '',
    i = 0

  if (queryParams) {
    queryString = querystring.stringify(queryParams)
  }

  return `${ApiUrls.huxley2}/${service}/${urlParams ? urlParams.join('/') : ''}${queryString}`
}
