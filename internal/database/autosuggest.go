package database

import "sort"

type ACResponse interface {
	GetName() string
	SetLev(lev int)
	GetLev() int
}

type AutoCompleteResponseAirport struct {
	Type         string `json:"type"`
	Name         string `json:"name"`
	Country      string `json:"country"`
	Municipality string `json:"municipality"`
	IATA         string `json:"iata"`
	lev          int
}

type AutoCompleteResponseCountry struct {
	Type string `json:"type"`
	Name string `json:"name"`
	Code string `json:"iso_code"`
	lev  int
}

func (a AutoCompleteResponseAirport) GetName() string {
	return a.Name
}

func (c AutoCompleteResponseCountry) GetName() string {
	return c.Name
}

func (a *AutoCompleteResponseAirport) SetLev(levVal int) {
	a.lev = levVal
}

func (c *AutoCompleteResponseCountry) SetLev(levVal int) {
	c.lev = levVal
}

func (a AutoCompleteResponseAirport) GetLev() int {
	return a.lev
}

func (c AutoCompleteResponseCountry) GetLev() int {
	return c.lev
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func lev(s, t string) int {
	r1, r2 := []rune(s), []rune(t)
	len1, len2 := len(r1), len(r2)

	if len1 == 0 {
		return len2
	}
	if len2 == 0 {
		return len1
	}

	if len1 > len2 {
		r1, r2 = r2, r1
		len1, len2 = len2, len1
	}

	curr := make([]int, len1+1)
	for i := 0; i <= len1; i++ {
		curr[i] = i
	}

	for i := 1; i <= len2; i++ {
		prev := curr[0]
		curr[0] = i

		for j := 1; j <= len1; j++ {
			temp := curr[j]
			if r1[j-1] == r2[i-1] {
				curr[j] = prev
			} else {
				curr[j] = min(prev, min(curr[j-1], curr[j])) + 1
			}
			prev = temp
		}
	}

	return curr[len1]
}

func LevenshteinSort(searchString string, inputArr []ACResponse) []ACResponse {
	for _, v := range inputArr {
		name := v.GetName()
		value := lev(searchString, name)
		v.SetLev(value)
	}
	sort.Slice(inputArr, func(i, j int) bool {
		return inputArr[i].GetLev() < inputArr[j].GetLev()
	})
	return inputArr
}

func AutoComplete(input string) ([]ACResponse, error) {
	if len(input) <= 1 {
		return nil, nil
	}

	searchPattern := "%" + input + "%"
	apRes, err := db.Query(`
	SELECT a.name, a.iso_country, a.municipality, a.iata_code 
	FROM sky_save.airports a 
	WHERE a.name 
	LIKE ?
	ORDER BY a.popularity DESC
	LIMIT 5`, searchPattern)
	defer apRes.Close()
	if err != nil {
		return nil, err
	}

	var AutoCompArr []ACResponse
	for apRes.Next() {
		var ac AutoCompleteResponseAirport
		err = apRes.Scan(&ac.Name, &ac.Country, &ac.Municipality, &ac.IATA)
		ac.Type = "Airport"
		if err != nil {
			return nil, err
		}

		AutoCompArr = append(AutoCompArr, &ac)
	}

	cRes, err := db.Query(`
	SELECT c.name, c.code FROM sky_save.countries c
	WHERE c.name LIKE ?
	LIMIT 2
	`, searchPattern)

	defer cRes.Close()

	if err != nil {
		return nil, err
	}

	for cRes.Next() {
		var cRow AutoCompleteResponseCountry

		err = cRes.Scan(&cRow.Name, &cRow.Code)
		if err != nil {
			return nil, err
		}
		cRow.Type = "Country"
		AutoCompArr = append(AutoCompArr, &cRow)
	}

	AutoCompArr = LevenshteinSort(input, AutoCompArr)

	return AutoCompArr, nil
}
