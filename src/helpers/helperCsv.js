const lodash = require('lodash')
module.exports = {
  isCSV: (req) => {
    return req.orig.payload.csv.hapi.filename.split('.').slice(-1).pop() == "csv"
  },
  csvToJSON: (file) => {
    bufferString = file.toString(); 
    arr = bufferString.split('\n');
    arr.pop();
    data = arr.map(elem => {
      const split = elem.split(',')
      let object = {}
      object.id = split[0]
      object[split[1]] = split[2]
      return object
    })
    let res = []
    data.forEach(element => {
      const filter = res.filter(el => el.id === element.id)
      if (lodash.isEmpty(filter)){
        res.push(element)
      }else{
        index = res.indexOf(filter[0])
        res[index] = ({...filter[0], ...element})
      }
    });
    return res
  }
}