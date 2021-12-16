// // API information.
// const apiUrl = 'https://api.themoviedb.org/3/movie/550?api_key=3ec80d65ec614f7f6cfd8cd672832eb4';
// const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI =
//     "https://api.themoviedb.org/3/search/movie?&api_key=3ec80d65ec614f7f6cfd8cd672832eb4&query=";
// // Selecting our Elements.
// const main = document.getElementById("main");
// const form = document.getElementById("form");
// const search = document.getElementById("search");
// /* call the showMovies function that requests the movie data from the Api using fetch.
//  Then it puts those data in the main HTML tag by creating elments for those data. */
// showMovies(apiUrl);
// function showMovies(url){
//     fetch(url).then(res => res.json())
//     .then(function(data){
//     data.results.forEach(element => {
//       // Creating elemnts for our data inside the main tag. 
//         const el = document.createElement('div');
//         const image = document.createElement('img');
//         const text = document.createElement('h2');

//         text.innerHTML = `${element.title}`;
//         image.src = IMGPATH + element.poster_path;
//         el.appendChild(image);
//         el.appendChild(text);
//         main.appendChild(el);
//     }); 
// });
// }

// // Prevent the Form from submitting if the search bar is empty.
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     main.innerHTML = '';
     
//     const searchTerm = search.value;
//  /* Adding the value wriiten in the search bar to the search Api,
//     in order to get the movies we search for. */
//     if (searchTerm) {
//         showMovies(SEARCHAPI + searchTerm);
//         search.value = "";
//     }
// });


const API_KEY = 'api_key=3ec80d65ec614f7f6cfd8cd672832eb4';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;


const main = document.getElementById('main');
const form = document.getElementById('form');
const search =  document.getElementById('search');
getMovies(API_URL);

function getMovies(url)
{
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results);
    })
}


function showMovies(data)
{   main.innerHTML = '';

    data.forEach(movie =>{
        const {title,poster_path, vote_average,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `<img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}    
        </div>` 


        main.appendChild(movieEl);
    })
}

function getColor(vote)
{
    if(vote>= 8)
    {
        return 'green'
    }else if(vote>=5)
    {
        return 'orange'
    }else{
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

