const showsList = document.querySelector(".shows__cards");

const domainName = `https://project-1-api.herokuapp.com`;
const API_key = '0419780e-8dd8-49c0-9e55-898d29814a69';


function listShows() {

  axios.get(`${domainName}/showdates?api_key=${API_key}`).then((response) => {
    //sort the objects in the array by date
    const sortedShowdates = response.data.sort(function (a, b) { 
        return b.timestamp - a.timestamp;
    });

   sortedShowdates.forEach(function (show) {
    // create <li>
    const showsItem = document.createElement("li");
    showsItem.classList.add("shows__card");

    //create <h4>
    const dateTitle = document.createElement("h4");
    dateTitle.innerText = "Date";
    dateTitle.classList.add("shows__card--title");

    // create <p>
    const showsDate = document.createElement("p");
    let date=new Date(Number(show.date));
    let dateString= date.toDateString();
    showsDate.innerText =dateString;
    
    showsDate.classList.add("shows__card--content");
    showsDate.classList.add("shows__card--highlight");

    const venueTitle = document.createElement("h4");
    venueTitle.innerText = "Venue";
    venueTitle.classList.add("shows__card--title");

    const showsVenue = document.createElement("p");
    showsVenue.innerText = show.place;
    showsVenue.classList.add("shows__card--content");

    const locationTitle = document.createElement("h4");
    locationTitle.innerText = "Location";
    locationTitle.classList.add("shows__card--title");

    const showsLocation = document.createElement("p");
    showsLocation.innerText = show.location;
    showsLocation.classList.add("shows__card--content");

    // create button container
    
    const showsBtnWrapper = document.createElement("div");
    showsBtnWrapper.classList.add("shows__btnWrapper");

    // create <a> button
    const showsBtn = document.createElement("a");
    showsBtn.innerText = "Buy Tickets";
    showsBtn.setAttribute("href", "#");
    showsBtn.classList.add("shows__btnWrapper--btn");

    // append create elements  to showsItem
    showsItem.appendChild(dateTitle);
    showsItem.appendChild(showsDate);
    showsItem.appendChild(venueTitle);
    showsItem.appendChild(showsVenue);
    showsItem.appendChild(locationTitle);
    showsItem.appendChild(showsLocation);
    showsBtnWrapper.appendChild(showsBtn);
    showsItem.appendChild(showsBtnWrapper);

   

    // finally append all the <li> elements to showsList
    showsList.appendChild(showsItem);
  });
});
}


listShows();
