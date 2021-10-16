const showDetails = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tues Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

const showsList = document.querySelector(".shows__cards");
console.log(showsList);

function listShows() {
  for (let i = 0; i < showDetails.length; i++) {
    // create <li>
    const showsItem = document.createElement("li");
    showsItem.classList.add("shows__card");

    //create <h4>
    const dateTitle = document.createElement("h4");
    dateTitle.innerText = "Date";
    dateTitle.classList.add("shows__card--title");

    // create <p>
    const showsDate = document.createElement("p");
    showsDate.innerText = showDetails[i].date;
    showsDate.classList.add("shows__card--content");

    const venueTitle = document.createElement("h4");
    venueTitle.innerText = "Venue";
    venueTitle.classList.add("shows__card--title");

    const showsVenue = document.createElement("p");
    showsVenue.innerText = showDetails[i].venue;
    showsVenue.classList.add("shows__card--content");

    const locationTitle = document.createElement("h4");
    locationTitle.innerText = "Location";
    locationTitle.classList.add("shows__card--title");

    const showsLocation = document.createElement("p");
    showsLocation.innerText = showDetails[i].location;
    showsLocation.classList.add("shows__card--content");

    // create <a> button
    const showsBtn = document.createElement("a");
    showsBtn.innerText = "Buy Tickets";
    showsBtn.setAttribute("href", "#");
    showsBtn.classList.add("btn");

    // append create elements  to showsItem
    showsItem.appendChild(dateTitle);
    showsItem.appendChild(showsDate);
    showsItem.appendChild(venueTitle);
    showsItem.appendChild(showsVenue);
    showsItem.appendChild(locationTitle);
    showsItem.appendChild(showsLocation);
    showsItem.appendChild(showsBtn);

    // finally append all the <li> elements to showsList
    showsList.appendChild(showsItem);
  }
}

listShows();
