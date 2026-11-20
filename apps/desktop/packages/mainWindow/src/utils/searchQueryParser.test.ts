import { describe, expect, it } from "vitest"
import { parseSearchQuery } from "./searchQueryParser"

describe("GDLauncher instance launch links", () => {
  it("parses a valid numeric instance ID", () => {
    expect(parseSearchQuery("gdlauncher://launch/123")).toMatchObject({
      mode: "direct",
      items: [{ type: "gdlauncher_launch", instanceId: 123 }]
    })
  })

  it("accepts a trailing slash", () => {
    expect(parseSearchQuery("gdlauncher://launch/123/").items).toEqual([
      { type: "gdlauncher_launch", instanceId: 123 }
    ])
  })

  it.each([
    "gdlauncher://launch/0",
    "gdlauncher://launch/-1",
    "gdlauncher://launch/foo",
    "gdlauncher://launch/12abc",
    "gdlauncher://launch/9007199254740992"
  ])("rejects invalid instance launch URI %s", (uri) => {
    expect(parseSearchQuery(uri).mode).toBe("search")
  })

  it("preserves the existing share links", () => {
    expect(parseSearchQuery("gdlauncher://share/ABC1234").items).toEqual([
      { type: "gdlauncher_share", shareCode: "ABC1234" }
    ])
  })
})
