const productBox = document.querySelector("#product-box");

const COMPANIES_URL = "https://acme-users-api-rev.herokuapp.com/api/companies";
const PRODUCTS_URL = "https://acme-users-api-rev.herokuapp.com/api/products";
const OFFERINGS_URL = "https://acme-users-api-rev.herokuapp.com/api/offerings";

const helperPromise = URL => {
  fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data));
};
// helperPromsie(COMPANIES_URL);
// helperPromsie(OFFERINGS_URL);

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
  //   console.log(companyData);
  //   console.log(productsData);
  //   console.log(offeringsData);
};

const compareId = async (companiesUrl, offeringsUrl) => {
  const companies = fetch(companiesUrl);
  const offerings = fetch(offeringsUrl);
  const responses = await Promise.all([companies, offerings]);
    const companiesResponse = responses[0];
    const offeringsResponse = responses[1];
    const companiesData = await companiesResponse.json();
    const offeringsData = await offeringsResponse.json();
    // console.log(companiesData)
    console.log(companiesData)
    companiesData.forEach(company => {
        offeringsData.forEach(offering => {
            if(company.id === offering.companyId){
                console.log(offering.price)
            }
        })
    })
};

fetchData(COMPANIES_URL, PRODUCTS_URL, OFFERINGS_URL);
compareId(COMPANIES_URL, OFFERINGS_URL);
