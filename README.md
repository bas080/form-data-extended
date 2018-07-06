# Form Data Extended

[![Build Status](https://travis-ci.org/bas080/form-data-extended.svg?branch=master)](https://travis-ci.org/bas080/form-data-extended)
[![Greenkeeper badge](https://badges.greenkeeper.io/bas080/form-data-extended.svg)](https://greenkeeper.io/)

Makes FormData support nested objects and arrays.

As far as I know there are no hard specifications concerning nested multipart
requests.  This package tries to cater to the most common use cases.  Allowing
configuration to support different standards could be part of future features.

# Installation

`npm install form-data-extended --save`

# Usage

Form data extended exports a single function that takes an object or array. It
returns a `FormData` instance that should be correctly structured.

```javascript
const formData = require('form-data-extended')

const userFormData = formData({
  name: "John Doe",
  location: {
    country: "USA",
    city: "New York",
  },
  picture: file, // file instanceof File === true
  nicknames: [
    "Johny",
    "Joe",
    "Jo",
  ]
})

userFormData instanceof FormData // => true
```

The FormData will have the following key value pairs. Notice that it supports
file instances too.

```
name = John Doe
location[country] = USA
location[city] = "New York"
picture = <file>
nicknames[] = Johny
nicknames[] = Joe
nicknames[] = Jo
```
