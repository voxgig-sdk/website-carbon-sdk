-- WebsiteCarbon SDK error

local WebsiteCarbonError = {}
WebsiteCarbonError.__index = WebsiteCarbonError


function WebsiteCarbonError.new(code, msg, ctx)
  local self = setmetatable({}, WebsiteCarbonError)
  self.is_sdk_error = true
  self.sdk = "WebsiteCarbon"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WebsiteCarbonError:error()
  return self.msg
end


function WebsiteCarbonError:__tostring()
  return self.msg
end


return WebsiteCarbonError
