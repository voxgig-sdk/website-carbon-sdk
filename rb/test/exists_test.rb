# WebsiteCarbon SDK exists test

require "minitest/autorun"
require_relative "../WebsiteCarbon_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WebsiteCarbonSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
