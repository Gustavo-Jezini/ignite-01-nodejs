// ?search=gustavo&page=2
// -> remove o '?' e depois separa em arr por &
// -> [ 'search=gustavo', 'page=2' ]

export function extractQueryParams(query) {
  return query.substr(1).split('&')
    .reduce((queryParams, param) => {
      const [ key, value ] = param.split('=') // -> [ 'search', 'gustavo' ]
      
      queryParams[key] = value
      
      return queryParams
    }, {})
}