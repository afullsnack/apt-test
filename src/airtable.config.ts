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
  private baseUrl: string = 'https://api.airtable.com/v0'
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
    this.baseId = BASE_ID
    if (BASE_ID) {
      const response = await fetch(`${this.baseUrl}/meta/bases/${BASE_ID}/tables`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        // console.log(json, ':::getting specific base schema')
        return json
      } else {
        console.log(response.status, response.statusText, ':::error fetching base')
        throw new Error(response.statusText)
      }
    } else {
      throw new NoBaseIdError('No base ID was found for this Airtable instance')
    }
  }

  // Get records count specific table
  // > path: /{baseId}/{tableIdOrName}
  // > pageSize: 100 - default
  // > offset: if more records after {pageSize} response will contain {offset}
  // > records: array of objects
  async getAirtableRowCount(tableName: string, baseId?: string) {
    const BASE_ID = baseId ?? this.baseId
    this.baseId = BASE_ID
    const url = `${this.baseUrl}/${this.baseId}/${tableName}`
    let totalRecords = 0
    let offset: string | undefined

    if (BASE_ID) {
      do {
        try {
          const encUrl = encodeURI(`${url}${offset ? `?offset=${offset}` : ''}`)
          console.log(encUrl, ':::encoded URL')
          const response = await fetch(encUrl, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })

          if (response.ok) {
            const json = await response.json()
            // console.log(json, ':::getting specific base schema')

            totalRecords += json.records.length
            offset = json.offset
            console.log(totalRecords, ':::current total records')
          } else {
            console.log(response.status, response.statusText, ':::error fetching base')
            throw new Error(response.statusText)
          }
        } catch (error) {
          console.error('Error fetching data from Airtable:', error)
          throw error
        }
      } while (offset)

      return totalRecords
    } else {
      throw new NoBaseIdError('No base ID was found for this Airtable instance')
    }
  }

  // Get records for specific table
  // > path: /{baseId}/{tableIdOrName}
  // > pageSize: 100 - default
  // > offset: if more records after {pageSize} response will contain {offset}
  // > records: [object of row]
  async listTableRecords(tableId: string, recordCount: number = 30, baseId?: string) {
    const BASE_ID = this.baseId ?? baseId
    if (BASE_ID) {
      const response = await fetch(
        `${this.baseUrl}/${BASE_ID}/${tableId}?maxRecords=${recordCount}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      )

      if (response.ok) {
        const json = await response.json()

        return json
      } else {
        console.log(response.status, response.statusText, ':::Error in network call')
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
