require("dotenv").config()

const query = `
query AirtableProductsQuery {
  productsTable: allAirtable(filter: { table: { eq: "Products" } }) {
    products: edges {
      product: node {
        id: recordId
        data {
          name
          description
          price
          categories
        }
      }
    }
  }
}
`

module.exports = {
  siteMetadata: {
    title: `Gatsby Content Mesh by Example`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    navbar: [
      {
        text: "Blog",
        path: "/blog",
      },
      {
        text: "Local content",
        path: "/local",
      },
      {
        text: "Airtable",
        path: "/airtable",
      },
      {
        text: "Contentful",
        path: "/contentful",
      },
      {
        text: "Google Sheet",
        path: "/google-sheet",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-json`,
    // `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`, `.markdown`],
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Cobalt2", // Or install your favorite theme from GitHub
              extensions: ["theme-cobalt2"],
            },
          },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: `appmjr4ydBp8PtdOu`,
            tableName: `Products`,
            tableView: `Validated products`,
            mapping: { image: `fileNode` },
          },
          {
            baseId: `appmjr4ydBp8PtdOu`,
            tableName: `Categories`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ne0jbjrov31z`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-source-google-spreadsheet",
      options: {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        credentials: {
          type: "service_account",
          project_id: process.env.PROJECT_ID,
          private_key_id: process.env.PRIVATE_KEY_ID,
          private_key: process.env.PRIVATE_KEY.replace(/(\\r)|(\\n)/g, "\n"),
          client_email: process.env.CLIENT_EMAIL,
          client_id: process.env.CLIENT_ID,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/cagalj-4-google-sheets%40quickstart-1594282856586.iam.gserviceaccount.com",
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-flexsearch",
      options: {
        type: "GoogleSpreadsheetArticles",
        fields: [
          {
            name: "id",
            indexed: false,
            resolver: "id",
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "title",
            indexed: true,
            resolver: "title",
            attributes: {
              encode: "balance",
              tokenize: "forward",
              threshold: 6,
              depth: 3,
            },
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "author",
            indexed: false,
            resolver: "author",
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "date",
            indexed: true,
            resolver: "date",
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "conference",
            indexed: false,
            resolver: "conference",
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "journal",
            indexed: false,
            resolver: "journal",
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "selected",
            indexed: false,
            resolver: "selected",
            store: true, // In case you want to make the field available in the search results.
          },
          {
            name: "url",
            indexed: false,
            resolver: "url",
            store: true, // In case you want to make the field available in the search results.
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
