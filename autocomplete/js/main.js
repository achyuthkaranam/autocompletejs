const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search cities.json and filter it..

const searchCities = async searchText => {
    
    // Fetching api from cities.json.. 
    const res = await fetch('../data/cities.json');
    const cities = await res.json();

   // console.log(cities);
   // Get matches to current text input..
   let matches = cities.filter(city => {
       const regex = new RegExp(`^${searchText}`, 'gi');
       return city.name.match(regex) || city.state.match(regex);
   });
   if(searchText.length === 0){
       matches = [];
       matchList.innerHTML = "";
   }

   outputHtml(matches);
   //console.log(matches);
};

// Show results in HTML..
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name}<span class="text-primary"> - ${match.state}</span>
                </h4>
            </div>
        `
        ).join('');
        matchList.innerHTML = html;
       // console.log(html);
    }
};

search.addEventListener('input',()=>searchCities(search.value));