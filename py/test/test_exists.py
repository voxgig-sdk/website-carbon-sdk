# ProjectName SDK exists test

import pytest
from websitecarbon_sdk import WebsiteCarbonSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WebsiteCarbonSDK.test(None, None)
        assert testsdk is not None
