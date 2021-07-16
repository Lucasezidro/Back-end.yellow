const Boom = require('boom')
const validator = require('fastest-validator')

const services = require('./services')

const v = new validator

module.exports = {
    create: async ctx => {
        const { request: {body}, response } = ctx;
        const schema = {
            email: { max: 255, min: 5, type: 'string' },
            password: { max: 16, min: 8, type: 'string' }
        }

        const errors = v.validate(body, schema)

        if(Array.isArray(errors) && errors.length) {
            response.status = 400
            return response.body = Boom.badRequest(null, errors)
        }

        const user = await services.create(body)
        response.body = user
    }
} 