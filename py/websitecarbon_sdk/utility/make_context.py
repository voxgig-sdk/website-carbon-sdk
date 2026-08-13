# WebsiteCarbon SDK utility: make_context

from websitecarbon_sdk.core.context import WebsiteCarbonContext


def make_context_util(ctxmap, basectx):
    return WebsiteCarbonContext(ctxmap, basectx)
