const badRequest = require('./bad-request')
const customApi = require('./custom-api')
const notFound = require('./not-found')
const unauthorized = require('./unauthentictated')

module.exports = {
    badRequest,
    customApi,
    notFound,
    unauthorized
}