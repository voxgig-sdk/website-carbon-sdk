# WebsiteCarbon SDK feature factory

from feature.base_feature import WebsiteCarbonBaseFeature
from feature.test_feature import WebsiteCarbonTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WebsiteCarbonBaseFeature(),
        "test": lambda: WebsiteCarbonTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
