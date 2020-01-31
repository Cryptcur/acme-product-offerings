const main = document.querySelector("main");

const COMPANIES_URL = "https://acme-users-api-rev.herokuapp.com/api/companies";
const PRODUCTS_URL = "https://acme-users-api-rev.herokuapp.com/api/products";
const OFFERINGS_URL = "https://acme-users-api-rev.herokuapp.com/api/offerings";

const fetchData = async (companiesURL, productsURL, offeringsURL) => {
  const companies = fetch(companiesURL);
  const products = fetch(productsURL);
  const offerings = fetch(offeringsURL);

  const responses = await Promise.all([companies, products, offerings]);
  const companiesResponse = responses[0];
  const productsResponse = responses[1];
  const offeringsResponse = responses[2];
  const companyData = await companiesResponse.json();
  const productsData = await productsResponse.json();
  const offeringsData = await offeringsResponse.json();
  //   let
  // console.log(companyData);
  // console.log(productsData);
  // console.log(offeringsData);
  const mappedData = productsData.map(product => {
    const returnedProduct = { product, offerings: [] };
    offeringsData.forEach(offering => {
      if (offering.productId === product.id) {
        returnedProduct["offerings"].push(offering);
        offering["company"] = companyData.find(
          company => company.id === offering.companyId
        );
      }
    });
    // console.log(returnedProduct);
    return returnedProduct;
  });
  // return [companyData, productsData, offeringsData];

  // return [{productsData[0], offerings}]\
  // console.log(mappedData);
  // console.log(mappedData);
  return mappedData;
};

const render = () => {
  fetchData(COMPANIES_URL, PRODUCTS_URL, OFFERINGS_URL).then(mappedData => {
    let html = "";
    mappedData.forEach(object => {
      html += `<div class="product-box">`;

      html += `<h1>${object.product["name"].toUpperCase()}</h1>`;
      html += `<p class="description">${object.product.description}</p>`;
      html += `<span class="price">$${object.product["suggestedPrice"].toFixed(
        2
      )}</span>`;
      html += `<ul class='offerlist'></ul>`;
      html += `</div>`;
    });
    main.innerHTML = html;
  });
};

// const compareId = async (companiesUrl, offeringsUrl) => {
//   const companies = fetch(companiesUrl);
//   const offerings = fetch(offeringsUrl);
//   const responses = await Promise.all([companies, offerings]);
//     const companiesResponse = responses[0];
//     const offeringsResponse = responses[1];
//     const companiesData = await companiesResponse.json();
//     const offeringsData = await offeringsResponse.json();
//     // console.log(companiesData)
//     console.log(companiesData)
//     let arr = []
//     companiesData.forEach(company => {
//         offeringsData.forEach(offering => {
//             if(company.id === offering.companyId){
//                 console.log(offering)
//             }
//         })
//     })
// };

// compareId(COMPANIES_URL, OFFERINGS_URL);
render();
