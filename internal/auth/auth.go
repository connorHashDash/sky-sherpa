package auth

import (
	"errors"
	"net/http"
	"time"
)

func AuthUser(request *http.Request) error {
	username := request.Header.Get("username")

	req, err := http.NewRequest(http.MethodGet, "http://localhost:8080/user/Authorise", nil)

	if err != nil {
		return err
	}

	req.Header = http.Header{
		"username":     {username},
		"X-CSRF-Token": {request.Header.Get("X-CSRF-Token")},
		"Content-Type": {"application/x-www-form-urlencoded"},
	}

	for _, cookie := range request.Cookies() {
		req.AddCookie(cookie)
	}

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	res, err := client.Do(req)

	if res.StatusCode > 299 {
		err := errors.New("Unauthorised")
		return err
	}
	return nil
}
