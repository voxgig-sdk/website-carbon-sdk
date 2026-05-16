package core

type WebsiteCarbonError struct {
	IsWebsiteCarbonError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWebsiteCarbonError(code string, msg string, ctx *Context) *WebsiteCarbonError {
	return &WebsiteCarbonError{
		IsWebsiteCarbonError: true,
		Sdk:              "WebsiteCarbon",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WebsiteCarbonError) Error() string {
	return e.Msg
}
