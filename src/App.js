import React, { useEffect, useState } from 'react'
import Select from 'react-select'
function App() {
  const [countriesOptions, setCountriesOptions] = useState([])
  const [citiesOptions, setCitiesOptions] = useState([])

  const [countries, setCountries] = useState([])
  useEffect(() => {
    fetch(`https://countriesnow.space/api/v0.1/countries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((header) => {
        if (!header.ok) {
          throw Error(header)
        }
        return header.json()
      })
      .then((response) => {
        let countriesCopy = []
        let countriesOptionsCopy = []
        response.data.forEach((country) => {
          countriesCopy.push(country)
          countriesOptionsCopy.push({
            value: country.country.toLowerCase(),
            label: country.country,
          })
        })
        setCountries(countriesCopy)
        setCountriesOptions(countriesOptionsCopy)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  const countriesHandler = (event) => {
    if (event.value) {
      const cities = countries.find(
        (country) => event.label === country.country
      )
      const citiesOptionsCopy = []
      cities.cities.forEach((city) => {
        citiesOptionsCopy.push({
          value: city.toLowerCase(),
          label: city,
        })
      })
      setCitiesOptions(citiesOptionsCopy)
    }
  }
  return (
    <div className='App'>
      <Select options={countriesOptions} onChange={countriesHandler} />
      {citiesOptions.length > 0 ? <Select options={citiesOptions} /> : null}
    </div>
  )
}

export default App
