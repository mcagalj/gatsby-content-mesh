---
slug: bits-of-graphql
title: Howto GraphQL
date: 2019-11-07
author: MC
keywords:
  - GraphQL
banner: ./images/banner.jpg
bannerCredit: Photo by Riccardo Chiarini on Unsplash
published: true
---

## Intro

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## Introduction to GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

### Query

```js
query BlogIndex {
  allMdx(filter: {fileAbsolutePath: {regex: "//content/blog//"}}) {
    posts: edges {
      post: node {
        id
        frontmatter {
          author
          date
          description
          slug
          title
        }
        excerpt(pruneLength: 120)
      }
    }
  }
}
```

### Subscription, Mutation and Fragment

```javascript
const QUESTION_FRAGMENT = gql`
  fragment QuestionParts on questions {
    id
    text
    title
    question_date {
      formatted_date
    }
  }
`;

const ANSWER_FRAGMENT = gql`
  fragment AnswerParts on answers {
    id
    text
  }
`;

const SUBSCRIBE_TO_NEW_ANSWER = gql`
  subscription onNewAnswer($question_id: uuid!) {
    questions(where: { id: { _eq: $question_id } }) {
      ...QuestionParts
      answers {
        ...AnswerParts
      }
    }
  }
  ${QUESTION_FRAGMENT}
  ${ANSWER_FRAGMENT}
`;

const INSERT_ANSWER = gql`
  mutation InsertAnswer($question_id: uuid!, $answer: String!) {
    insert_answers(objects: { question_id: $question_id, text: $answer }) {
      returning {
        ...AnswerParts
      }
    }
  }
  ${ANSWER_FRAGMENT}
`;
```