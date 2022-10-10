export const fetchAllProduct = () =>
  fetch("http://localhost:4000/", {
    body: JSON.stringify({
      query: `
    {
      categories {
        name 
        products {
          name
          id
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    }
    `,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Dnt: "1",
    },
    method: "POST",
  }).then((response) => response.json());

export const fetchSingleProduct = (productId) =>
  fetch("http://localhost:4000/", {
    body: JSON.stringify({
      query: `
  {
    product(id: "${productId}"){
      id
      name
      inStock
      description
      category
      brand
      gallery
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
  `,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Dnt: "1",
    },
    method: "POST",
  }).then((response) => response.json());

export const fetchCurrencySwitcher = () =>
  fetch("http://localhost:4000/", {
    body: JSON.stringify({
      query: `{
        currencies {
          label
          symbol
        }
      }`,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Dnt: "1",
    },
    method: "POST",
  }).then((response) => response.json());
