-- WebsiteCarbon SDK exists test

local sdk = require("website-carbon_sdk")

describe("WebsiteCarbonSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
