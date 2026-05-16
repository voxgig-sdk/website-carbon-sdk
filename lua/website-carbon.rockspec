package = "voxgig-sdk-website-carbon"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/website-carbon-sdk.git"
}
description = {
  summary = "WebsiteCarbon SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["website-carbon_sdk"] = "website-carbon_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
