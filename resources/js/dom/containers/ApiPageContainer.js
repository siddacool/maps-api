import { Component } from 'domr-framework';

const table = [
  {
    name: 'GetAllPlaces()',
    params: '-',
    returns: 'Array of cities and countries',
    desc: 'Gets all the cities and countries present in api',
  },
  {
    name: 'GetAllCountries()',
    params: '-',
    returns: 'Array of all countries',
    desc: 'Gets all the countries present in api',
  },
  {
    name: 'GetAllCities()',
    params: '-',
    returns: 'Array of all cities',
    desc: 'Gets all the cities present in api',
  },
  {
    name: 'FindCountryByCountryCode(country_code)',
    params: 'country_code e.g. IND',
    returns: 'object',
    desc: 'Gets the matching country based on the "country_code"',
  },
  {
    name: 'FindCitiesByCountryCode(country_code)',
    params: 'country_code e.g. IND',
    returns: 'Array of cities',
    desc: 'Gets all the cities matching the "country_code"',
  },
];

function MakeTable(tableVar) {
  return `
    <div class="table-holder">
      <div class="table">
        <div class="tbody">
          <div class="tr">
            <div class="th">Init Name</div>
            <div class="th">Params</div>
            <div class="th">Returns</div>
            <div class="th">Description</div>
          </div>
          ${tableVar.map(t =>
            `
              <div class="tr">
                <div class="td">${t.name}</div>
                <div class="td">${t.params}</div>
                <div class="td">${t.returns}</div>
                <div class="td">${t.desc}</div>
              </div>
            `).join('')}
        </div>
      </div>
    </div>
  `;
}

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    const makeTable = MakeTable(table);

    return `
      <div class="api">
        <div class="container">
          <div class="api__heading">
            <a href="#/" class="image">
              <img src="favicon/favicon.png" alt="Pin" />
            </a>
            <span class="heading1">Purple Maps</span>
            <span class="heading2">Api</span>
          </div>
          <div class="api__body">
            <div class="topic">
              <div class="topic__head">
                Install
              </div>
              <div class="topic__code">npm i --save purple-maps-api</div>
            </div>
            <div class="topic">
              <div class="topic__head">
                Initialize
              </div>
              <div class="topic__code">import { MethodName } from 'purple-maps-api';</div>
              <div class="topic__desc">
                Every method in api is a promise. It can be used like following.
              </div>
              <div class="topic__code">MethodName()
                .then((data) => {
                  // if request complete
                })
                catch((err) => {
                  // on error
                })
              </div>
            </div>
             <div class="topic">
              <div class="topic__head">
                Methods
              </div>
              ${makeTable}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
