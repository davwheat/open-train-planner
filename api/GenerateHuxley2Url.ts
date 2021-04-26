import ApiUrls from "../constants/ApiUrls";

export default function GenerateHuxley2Url(
  service: string,
  urlParams?: string[],
  queryParams?: string[]
): string {
  let queryString = "",
    i = 0;

  if (queryParams) {
    for (let [param, value] of Object.entries(queryParams)) {
      if (i === 0) queryString += `?${param}=${value}`;
      else queryString += `&${param}=${value}`;

      i++;
    }
  }

  return `${ApiUrls.huxley2}/${service}/${
    urlParams ? urlParams.join("/") : ""
  }${queryString}`;
}
