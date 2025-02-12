import { describe, it, expect } from "vitest"
import health from "./health"

describe("Health API", () => {
  it("should return a JSON response with status 'healthy'", async () => {
    const response = await health.request("GET", "/")
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.status).toBe("healthy")
  })

  it("should return the account info as JSON", async () => {
    const response = await health.request("GET", "/")
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.account).toBeDefined()
  })
})
