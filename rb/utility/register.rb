# WebsiteCarbon SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WebsiteCarbonUtility.registrar = ->(u) {
  u.clean = WebsiteCarbonUtilities::Clean
  u.done = WebsiteCarbonUtilities::Done
  u.make_error = WebsiteCarbonUtilities::MakeError
  u.feature_add = WebsiteCarbonUtilities::FeatureAdd
  u.feature_hook = WebsiteCarbonUtilities::FeatureHook
  u.feature_init = WebsiteCarbonUtilities::FeatureInit
  u.fetcher = WebsiteCarbonUtilities::Fetcher
  u.make_fetch_def = WebsiteCarbonUtilities::MakeFetchDef
  u.make_context = WebsiteCarbonUtilities::MakeContext
  u.make_options = WebsiteCarbonUtilities::MakeOptions
  u.make_request = WebsiteCarbonUtilities::MakeRequest
  u.make_response = WebsiteCarbonUtilities::MakeResponse
  u.make_result = WebsiteCarbonUtilities::MakeResult
  u.make_point = WebsiteCarbonUtilities::MakePoint
  u.make_spec = WebsiteCarbonUtilities::MakeSpec
  u.make_url = WebsiteCarbonUtilities::MakeUrl
  u.param = WebsiteCarbonUtilities::Param
  u.prepare_auth = WebsiteCarbonUtilities::PrepareAuth
  u.prepare_body = WebsiteCarbonUtilities::PrepareBody
  u.prepare_headers = WebsiteCarbonUtilities::PrepareHeaders
  u.prepare_method = WebsiteCarbonUtilities::PrepareMethod
  u.prepare_params = WebsiteCarbonUtilities::PrepareParams
  u.prepare_path = WebsiteCarbonUtilities::PreparePath
  u.prepare_query = WebsiteCarbonUtilities::PrepareQuery
  u.result_basic = WebsiteCarbonUtilities::ResultBasic
  u.result_body = WebsiteCarbonUtilities::ResultBody
  u.result_headers = WebsiteCarbonUtilities::ResultHeaders
  u.transform_request = WebsiteCarbonUtilities::TransformRequest
  u.transform_response = WebsiteCarbonUtilities::TransformResponse
}
