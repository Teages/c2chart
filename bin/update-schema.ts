import fs from 'node:fs'
import zodToJsonSchema from 'zod-to-json-schema'
import * as zodSchema from '../src/schema'

fs.writeFileSync('schema.json', `${generate()}\n`, 'utf-8')

export function generate() {
  const jsonSchema = zodToJsonSchema(zodSchema.default, { definitions: zodSchema.definitions })
  deepSetValue(jsonSchema, 'additionalProperties', undefined, false)

  return JSON.stringify(jsonSchema, null, 2)
}

function deepSetValue(schema: any, key: string, value: any = undefined, executed?: any) {
  for (const iKey in schema) {
    if (iKey === key && (executed === undefined || schema[iKey] === executed)) {
      if (value !== undefined) {
        schema[iKey] = value
      }
      else {
        delete schema[iKey]
      }
    }
    else if (typeof schema[iKey] === 'object') {
      if (Array.isArray(schema[iKey])) {
        for (const item of schema[iKey]) {
          if (typeof item === 'object') {
            deepSetValue(item, key, value, executed)
          }
        }
      }
      else {
        deepSetValue(schema[iKey], key, value, executed)
      }
    }
  }
}
