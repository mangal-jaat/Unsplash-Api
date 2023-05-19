/// Define Element as Variable
const form = document.querySelector(".search-form");
const search = document.querySelector(".search-input");
const more = document.querySelector(".search-more");
const result = document.querySelector(".result-list");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

/// Define Lightbox Element as Variable
const lightbox = document.querySelector(".lightbox-wrapper");

/// Define Spinner Element as Variable
const spinner = document.querySelector(".js-spinner");

/// Define Required Variable
let currPage = 1;

/// Fetch Unsplash Api Async await Function
async function fetchUnsplash() {
   const query = search.value;
   const endpoint = `https://api.unsplash.com/search/photos/?client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k&query=${query}&per_page=30&page=${currPage}`;
   const response = await fetch(endpoint);
   const data = await response.json();
   return data;
}

/// Define Unsplash Api Result Display Function
fetchUnsplash().then(data => {
    spinner.classList.remove('hidden');
    fetchUnsplash().then(data => {
	setTimeout(() => {
    displayUnsplash(data);
  }, "1000");
 });
});
//data.current_user_collections.title
/// Display Unsplash Api Result as HTML
const displayUnsplash = (data) => {
    data.results.forEach(data => {
        result.insertAdjacentHTML('beforeend',`
        <li class="image-card">
         <img src="${data.urls.regular}" onclick="showLightbox('${data.user.instagram_username}', '${data.user.links.html}', '${data.urls.regular}', '${data.links.download}&force=true')">
         <div class="overlay">
            <div class="author">
               By&nbsp;&nbsp;<a class="author-link" href="${data.user.links.html}" data-item="${data.user.instagram_username}" target="_self">${data.user.instagram_username}</a>
            </div>
            <div class="overlay-links">
              <select id="overlay-menu">
                <option value="">Copy Small Url</option>
                <option value="">Copy Thumb Url</option>
                <option value="">Copy Full Url</option>
                <option value="">Copy Regular Url</option>
              </select>
            </div>
         </div>
        </li>`);
        spinner.classList.add('hidden');
    })
}

/// Search Photos From Unsplash Fetced Api Data
const SearchPhoto = () => {
  spinner.classList.remove('hidden');
  fetchUnsplash().then(data => {
	setTimeout(() => {
    displayUnsplash(data);
  }, "1000");
 });
}

/// Clear Result Img List
function ClearImg(){
  result.innerHTML = "";
}

/// Submit Form Then Display Result
form.addEventListener('submit', function(e){
  e.preventDefault();
  currPage = 1;
  ClearImg();
  SearchPhoto();
})

/// load more
more.addEventListener('click', () => {
  currPage += 1;
  ClearImg();
  SearchPhoto();
})

/// load more
next.addEventListener('click', () => {
  currPage += 1;
  ClearImg();
  SearchPhoto();
})

/// load more
prev.addEventListener('click', () => {
  currPage += 1;
  ClearImg();
  SearchPhoto();
})


/// light box wrapper 
/// Define Show LightBox Function
const showLightbox = (name,usrUrl,img,save) => {
    lightbox.querySelector("img").src = img;
    lightbox.querySelector(".author-name").innerHTML = name;
    lightbox.querySelector(".author-name").setAttribute("href", usrUrl);
    lightbox.querySelector(".download-link").setAttribute("href", save);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

/// Define Hide LightBox Function
const hideLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}
