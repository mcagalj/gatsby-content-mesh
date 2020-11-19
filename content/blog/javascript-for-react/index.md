---
slug: javascript-to-know-for-react
title: JavaScript za rad s Reactom
date: 2019-11-09
author: MC
description: JavaScript for React
keywords:
  - react
  - javascript
banner: ./images/banner.png
bannerCredit: Photo by MC
published: true
---

Za efektivno korištenje React.js biblioteke dobro je poznavati moderne funkcionalnosti JavaScript jezika (ES6+). U nastavku ćemo pokazati dio modernih aspekata i funkcionalnosti JavaScript za efektan rad s Reactom.

## Template literals/strings

[MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

```javascript {numberLines, 7}
console.log("Hello" + " " + "world" + "!") // Hello world!

const greeting = "Hello"
const subject = "world"

// mind the back-ticks (` `)
console.log(`${greeting} ${subject}!`) // Hello world!

// multiline strings
console.log(`Hello
world!`)
// Hello
// world!
```

### Tagged templates

```js {numberLines, 13}
// here we define a tag called "fesb"
function fesb(strings, who, what) {
  const Who = who.charAt(0).toUpperCase() + who.slice(1)
  const What = what.charAt(0).toUpperCase() + what.slice(1)

  return `${Who}${strings[1]}"${What}" at FESB.`
}

const who = "ivana"
const what = "computer science"

// tagged template literal
const output = fesb`${who} studies ${what}`
console.log(output) // Ivana studies "Computer science" at FESB.
```

### Examples in Gatsby and React

#### Graphql tag <!-- omit in toc -->

```js
import { graphql } from "gatsby"

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        date
      }
    }
  }
`
```

#### Styled components <!-- omit in toc -->

```js
import styled from "styled-components"

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
`

const Avatar = styled.img`
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
`

const Username = styled.h2`
  margin: 0 0 12px 0;
  padding: 0;
`

const Button = styled.button`
  background: ${props => (props.primary ? "black" : "white")};
  color: ${props => (props.primary ? "white" : "black")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
`
```

Primjena definiranih komponenti:

```jsx
<Container>
  <Avatar img="photo.png" />
  <Username>John Doe</Username>
  <Button primary>Default</Button>}
</Container>
```

## Variable declaration (`var`, `let` and `const`)

```js
var name = "Ivan"
let surname = "Ivanic"
const gender = "male"
```

Tri jednostavna pravila pri deklaraciji varijabli:

1. Ne koristite `var`.
2. Kad god je to moguće koristite `const`.
3. Koristite `let` kad varijablu želite mijenjati.

## Object initializer

[MDN: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)

```js
// old way
let o = { a: "foo", b: 42, c: {} }
console.log(o) // { a: 'foo', b: 42, c: {} }

const a = "foo",
  b = 42,
  c = {}
o = { a: a, b: b, c: c }
console.log(o) // { a: 'foo', b: 42, c: {} }

// modern way (EC6+)
o = { a, b, c }
console.log(o) // { a: 'foo', b: 42, c: {} }
```

Koncizna inicjalizacija metoda u objektu:

```js
// old way
const securityService = {
  isAuthenticated: function(user) {
    return false
  },
}
console.log(securityService) // { isAuthenticated: [Function: isAuthenticated] }

// modern JavaScript (EC6+)
const securityService = {
  isAuthenticated(user) {
    return false
  },
}
console.log(securityService) // { isAuthenticated: [Function: isAuthenticated] }
```

### Examples in React

```jsx
return (
  <Auth0Context.Provider
    value={{
      isAuthenticated,
      user,
      isAdmin,
      loading,
      getToken() {
        return auth0Client.getToken()
      },
      login() {
        return auth0Client.login()
      },
      logout() {
        return auth0Client.logout()
      },
    }}
  >
    {children}
  </Auth0Context.Provider>
)
```

## Destructuring objects

[MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

Ova funkcionalnost omogućava efikasan i koncizan kod:

```js {numberLines, 10}
const user = { name: "Jean", role: "admin", followers: 10 }

// old way
let name = user.name
let role = user.role
let followers = user.followers
console.log(name, role, followers) // Jean admin 10

// modern EC6+ way
const { name, role, followers } = user
console.log(name, role, followers) // Jean admin 10
```

```javascript {numberLines, 10-12}
const user = { name: "Jean", role: "admin", followers: 10 }

// no destructuring
function printUser(user) {
  console.log(user.name, user.role, user.followers)
}
printUser(user) // Jean admin 10

// with destructuring
function printUser({ name, role, followers }) {
  console.log(name, role, followers)
}
printUser(user) // Jean admin 10
```

Destrukturiranje radi i s nizovima (_arrays_):

```js {numberLines, 10}
const user = ["Jean", "admin", 10]

// no destructuring
const name = user[0]
const role = user[1]
const followers = user[2]
console.log(name, role, followers) // Jean admin 10

// with destructuring
const [name, role, followers] = user
console.log(name, role, followers) // Jean admin 10

const [ime, uloga, sljedbenici] = user
console.log(ime, uloga, sljedbenici) // Jean admin 10
```

### Examples in React

```js
const NewQuestionForm = () => {
  const [title, setTitle] = useState();
  const [question, setQuestion] = useState();
  const [clearUI, setClearUI] = useState(true);
  const [submitQuestion, { loading, error, data }] = useMutation(QUESTION_MUTATION);
  ...
}
```

## Default parameters

[MDN: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

```javascript
const user = { name: "Jean" }

function printUser({ name, role = "user", followers = 0 }) {
  console.log(name, role, followers)
}
printUser(user) // Jean admin 0
```

## Rest and spread operators

[MDN: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

[MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Rest

```js
function myFun(a, b, ...rest) {
  console.log("a:", a)
  console.log("b:", b)
  console.log("rest:", rest)
}

myFun("one", "two", "three", "four", "five", "six")
// a: one
// b: two
// rest: [three, four, five, six]
```

### Spread

S nizovima:

```js
const arr1 = [0, 1, 2]
const arr2 = [3, 4, 5]

const arr3 = [...arr1, ...arr2]
console.log(arr3) // [ 0, 1, 2, 3, 4, 5 ]

const arr4 = [0, 1, 2, ...arr2, 6, 7, 8]
console.log(arr3) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
```

S objektima:

```js
const obj1 = { foo: "bar", x: 42 }
const obj2 = { foo: "baz", y: 13 }

const clonedObj = { ...obj1 }
// Object { foo: "bar", x: 42 }

const mergedObj = { ...obj1, ...obj2 }
// Object { foo: "baz", x: 42, y: 13 }
```

### Examples in React

```jsx
const user = { name: "Jean", role: "admin", followers: 10 }

function User({ name, role, followers }) {
  return (
    <span>
      {name} with role {role} is followed by {followers}
    </span>
  )
}
```

```jsx
// old way
function UserContainer(user) {
  return (
    <div>
      <User name={user.name} role={user.role} followers={user.followers} />
    </div>
  )
}
```

```jsx
// with spread
function UserContainer(user) {
  return (
    <div>
      <User {...user} />
    </div>
  )
}
```

## Conditional (ternary) operator

[MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

```js
let isAuthenticated = false

// longer way
if (isAuthenticated) {
  console.log("Welcome!")
} else {
  console.log("Please login.")
}

// more concise
isAuthenticated ? console.log("Welcome!") : console.log("Please login.")
```

### Examples in React

```jsx
isAdmin ? (
  <AnswerForm submitAnswer={submitAnswer} question_id={state.question_id} />
) : null
```

```jsx
data && data.length ? (
  <Table data={data} />
) : (
  <Error message={"Error loading data."} />
)
```

## Arrow functions

[MDN: Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

```javascript
// classical functions
function fun() {
  console.log("Hello arrow functions")
}

// equivalent arrow functions
const fun_arrow = () => console.log("Hello arrow functions")
```

S argumentima:

```js
// classical functions
function fun(text) {
  console.log(text)
}

// equivalent arrow functions
const fun_arrow = text => console.log(text)
```

S nizovima:

```js
const myarray = ["react", "angular", "vue"]

// classical function
const MYARRAY = myarray.map(function(element) {
  return element.toUpperCase()
})
console.log(MYARRAY) // ["REACT", "ANGULAR", "VUE"]

// arrow function
const MYARRAY = myarray.map(element => element.toUpperCase())
console.log(MYARRAY) // ["REACT", "ANGULAR", "VUE"]
```

### Examples in React

```jsx
const Answers = ({answers}) => (
    <ul>
        {
            answers.map(answer => (
                <li key={answer.id}>
                    <span>{answer.text}</span>
                </li>
            ));
        }
    </ul>
)


// let us use the component Answers
const answers = [
    {id: 0, text: "An arrow function expression is..."},
    {id: 1, text: "Arrow functions should not be used as methods..."},
];

const AnswerPane = () => (
    <>
        <Title>Answers:</Title>
        <Answers answers={answers} />
    </>
)
```

## Arrays

JavaScript `Array` objekt definira niz vrlo korisnih metoda za rad s nizovima:

- `find`
- `some`
- `every`
- `includes`
- `map`
- `filter`
- `reduce`

```js
const frontends = ["react", "angular", "vue"]

let result = frontends.find(frontend => frontend === "vue")
console.log(result) // vue

result = frontends.includes("angular")
console.log(result) // true

result = frontends.some(frontend => frontend === "react")
console.log(result) // true

result = frontends.some(frontend => frontend === "gatsby")
console.log(result) // false

result = frontends.every(
  frontend => frontend.includes("a") || frontend.includes("e")
)
console.log(result) // true

result = frontends.map(frontend => frontend.toUpperCase())
console.log(result) // [ 'REACT', 'ANGULAR', 'VUE' ]

result = frontends.filter(frontend => frontend.includes("e"))
console.log(result) // [ 'react', 'vue' ]

result = frontends.filter(frontend => frontend.includes("a"))
console.log(result) // [ 'react', 'angular' ]

result = frontends.reduce(
  (accumulator, currentValue) => {
    const a = currentValue.includes("a")
      ? [...accumulator["a"], currentValue]
      : [...accumulator["a"]]

    const e = currentValue.includes("e")
      ? [...accumulator["e"], currentValue]
      : [...accumulator["a"]]
    return {
      ...accumulator,
      a,
      e,
    }
  },
  { a: [], e: [] }
)
console.log(result) // { a: [ 'react', 'angular' ], e: [ 'react', 'vue' ] }
```

### Examples in React

```jsx
const Answers = ({answers}) => (
    <ul>
        {
            answers.map(answer => (
                <li key={answer.id}>
                    <span>{answer.text}</span>
                </li>
            ));
        }
    </ul>
)


// let us use the component Answers
const answers = [
    {id: 0, text: "An arrow function expression is..."},
    {id: 1, text: "Arrow functions should not be used as methods..."},
];

const AnswerPane = () => (
    <>
        <Title>Answers:</Title>
        <Answers answers={answers} />
    </>
)
```

## JavaScript module system (ES modules)

ES moduli omogućuju bolju organizaciju/modularizaciju JS koda, odnosno grupiranje povezanih varijabli i funkcija u nezavisne module.

### `export` and `import` statements

```js
// provider.js file/module
export default (name = "world") => {
  console.log(`Hello ${name}!`)
}

export const PI = 3.14
```

```js
// consumer.js file/module
import hello from "./provider"
import { PI } from "./provider"

hello("Slavko") // Hello Slavko!
console.log(2 * PI) // 6.28
```

### Examples in React

```js
import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useMutation, useSubscription } from "@apollo/react-hooks"
import Button from "@material-ui/core/Button"
```
