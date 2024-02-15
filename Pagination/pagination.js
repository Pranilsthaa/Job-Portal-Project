// pagination/paginatedResults.js

function paginatedResults(model) {
    return (req, res, next) => {
      const page = parseInt(req.query.page) 
      const limit = parseInt(req.query.limit) 
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      req.paginatedResults = {}

      if (endIndex < model.length) {
        req.paginatedResults.next = {
          page: page + 1,
          limit: limit
        }
      }
  
      if (startIndex > 0) {
        req.paginatedResults.previous = {
          page: page - 1,
          limit: limit
        }
      }
  
      req.paginatedResults.results = model.slice(startIndex, endIndex)
      next()
    }
  }
  


module.exports = {paginatedResults}