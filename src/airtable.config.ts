/*
 * Interfase requirements:
 * - Quesry the airtable API resource
 * - Fetch details on various resource types
 * - Validate and parse/decode various resource types
 */

// TODO: Create Airtable interface
type AirtableConfig = {
  token: string
  baseId?: string
}
class Airtable {
  private token: string
  private baseId?: string
  private baseUrl: string = 'https://api.airtable.com/v0/meta'
  constructor({ token, baseId }: AirtableConfig) {
    // TODO: return object with config options
    this.token = token
    if (baseId && baseId.length) {
      this.baseId = baseId
    }

    return this
  }

  // Get base schema:
  //> Tables with table model
  //> Fields with field model
  //> Views with view model
  async base(baseId?: string) {
    const BASE_ID = baseId ?? this.baseId
    if (BASE_ID) {
      const response = await fetch(`${this.baseUrl}/bases/${BASE_ID}/tables`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        console.log(json, ':::getting specific base schema')
        return json
      }
    }

    throw new NoBaseIdError('No base ID was found for this Airtable instance')
  }

  // Get records for specific table
  // > path: /{baseId}/{tableIdOrName}
  // > pageSize: 100 - default
  // > offset: if more records after {pageSize} response will contain {offset}
  // > records: [object of row]
  async listTableRecords(tableId: string) {
    const BASE_ID = this.baseId
    if (BASE_ID) {
      const response = await fetch(`${this.baseUrl}/${BASE_ID}/${tableId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        console.log(json, ':::list table records')
        return json
      } else {
        throw new Error('Something went wrong with the request')
      }
    }

    throw new NoBaseIdError('No base ID was found for this Airtable instance')
  }

  async allBases() {
    // TODO: call base details
    const response = await fetch(`${this.baseUrl}/bases`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (response.ok) {
      const json = await response.json()
      console.log(json, ':::json response from fetching bases')
      return { bases: json['bases'] }
    }
  }
}

export class NoBaseIdError extends Error {
  private _tag = 'NoBaseIdError'
  constructor(message: string) {
    super(message)
    super.name = this._tag
    super.message = message
    console.error(`[${this._tag}]: ${message}`)
  }
}

export { Airtable }
export type { AirtableConfig }
