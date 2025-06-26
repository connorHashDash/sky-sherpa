package requestbuilder

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"net/http"
	"time"
)

/* To reduce repition of creating clients, error handling, making requests, creating headers/bodies etc. for
* the various endpoints, I thought it would be easier to just create a wrapper function that can
* just be called once. and return the response of the request
 */

var client = http.Client{
	Timeout: 20 * time.Second,
}

func Request(method string, url string, Header http.Header, body string) ([]byte, error) {

	req, err := http.NewRequest(method, url, bytes.NewReader([]byte(body)))

	if err != nil {
		return nil, err
	}

	req.Header = Header

	res, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	if res.StatusCode > 299 {
		zippedErrbody, _ := gzip.NewReader(res.Body)
		errBody, _ := io.ReadAll(zippedErrbody)
		return nil, fmt.Errorf("Request to %v\n failed with:\n     status code: %v\n     body: %v\n", url, res.StatusCode, string(errBody))
	}

	unzippedBody, _ := gzip.NewReader(res.Body)

	bodyAsBytes, _ := io.ReadAll(unzippedBody)

	return bodyAsBytes, nil
}
