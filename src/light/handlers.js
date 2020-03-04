const heslperCSV =  require('../helpers/helperCsv')
const uuid = require('uuid')
const fs = require('fs')
const api = require("../api/fetcher.js");
const mutations = require("../api/mutations.js");

const API_URL = process.env.API_URL || "https://hasura.k8s.louisperdereau.fr/v1/graphql";
const hasura_admin_secret = process.env.HASURA_ADMIN_SECRET || "";

module.exports = {
  csv: async function (req, h) {
    if (heslperCSV.isCSV(req)) {
      const id = uuid.v4()
      fs.writeFileSync(`/tmp/${id}.csv`, req.orig.payload.csv._data)
      const file = fs.readFileSync(`/tmp/${id}.csv`)
      const promises = heslperCSV.csvToJSON(file).map(element => {
        return api.fetchAsync(API_URL,
          "",
          api.fetcher,
          mutations.INSERT_LIGHT,
          element,
          {"x-hasura-admin-secret": hasura_admin_secret})
      });
      return Promise.all(promises)
      .then(el => {
        return h.response(JSON.stringify(el)).code(201)
      })
      .catch(err => {
        return h.response(JSON.stringify(err)).code(500)
      })
    }
  }
}