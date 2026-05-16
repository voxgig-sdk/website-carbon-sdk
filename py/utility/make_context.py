# WebsiteCarbon SDK utility: make_context

from core.context import WebsiteCarbonContext


def make_context_util(ctxmap, basectx):
    return WebsiteCarbonContext(ctxmap, basectx)
