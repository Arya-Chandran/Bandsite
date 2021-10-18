
// create an array with 3 default comment objects
const commentDetails = [
  {
    personName: "Connor Walton",
    timeStamp: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains",
  },
  {
    personName: "Emilie Beach",
    timeStamp: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    personName: "Miles Acosta",
    timeStamp: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const commentsList = document.querySelector(".comments__cards");

// create function that takes one comment object as a parameter
function displayComment(newComment) {  
  if (newComment) {
    commentDetails.push(newComment); // added new comment to the array
  }
  const sortedComments = commentDetails.sort(function (a, b) {  // sort the objects in the array by date
    return new Date(b.timeStamp) - new Date(a.timeStamp);
  });

  sortedComments.forEach(function (comment) {
    // create <li>
    const commentsItem = document.createElement("li");
    commentsItem.classList.add("comments__card");

    //create <div>
    const leftDiv = document.createElement("div")
    leftDiv.classList.add("comments__card--left");

    //create <image>
    const commentsImage = document.createElement("img");
    commentsImage.classList.add("comments__card--image");
  
   
    //create <div>
    const rightDiv = document.createElement("div")
    rightDiv.classList.add("comments__card--right");

    
    //create <div>
    const topDiv = document.createElement("div")
    topDiv.classList.add("comments__card--top");

    //create <h4>
    const commentsName = document.createElement("h4");
    commentsName.innerText = comment.personName;
    commentsName.classList.add("comments__card--name");

    // create <p>
    const commentsDate = document.createElement("p");
    commentsDate.innerText = new Date(comment.timeStamp) .toLocaleString() .split(",")[0];
    commentsDate.classList.add("comments__card--date");
    
    //create <div>
    const bottomDiv = document.createElement("div")
    bottomDiv.classList.add("comments__card--bottom");

    const commentsText = document.createElement("p");
    commentsText.innerText = comment.comment;
    commentsText.classList.add("comments__card--text");

    // append create elements  to commentsItem
    leftDiv.appendChild(commentsImage);
    commentsItem.appendChild(leftDiv);
    topDiv.appendChild(commentsName);
    topDiv.appendChild(commentsDate);
    rightDiv.appendChild(topDiv);
    bottomDiv.appendChild(commentsText);
    rightDiv.appendChild(bottomDiv);
    commentsItem.appendChild(rightDiv);

    // finally append all the <li> elements to commentsList
    commentsList.appendChild(commentsItem);
  });
}

// Get timestamp in mm/dd/yyyy format
function getCurrentDate() {
  const currentDate = new Date(Date.now());
  return currentDate;
}

function createCommentObject(name, comment) {
  return {
    personName: name,
    timeStamp: getCurrentDate(),
    comment: comment,
  };
}

// Clears the input fields after submitting a new comment
function clear() {
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

// Event Listeners for handling input active and error state
const nameField = document.getElementById("name");
const commentField = document.getElementById("comment");

nameField.addEventListener('input', function (e) {
  if( e.target.value) {
    document.querySelector(".comments__form--name").style.border = "1px solid #323232";
  }
});

commentField.addEventListener('input', function (e) {
  console.log(e.target.value)
  if( e.target.value) {
    document.querySelector(".comments__form--text").style.border = "1px solid #323232";
  }
});

// Event Listener for handling form submission
const form = document.getElementById("comments__form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = e.target.name.value;
  const comment = e.target.comment.value;

  if (!name || !comment) {
    if(!name) {
      document.querySelector(".comments__form--name").style.border = "1px solid #d22d2d";
    }
    if(!comment) {
      document.querySelector(".comments__form--text").style.border = "1px solid #d22d2d";
    }
  } else {
    let commentSection = document.querySelector(".comments__cards");

    //creating new comment object
    const newComment = createCommentObject(name, comment);
  
    //Clearing the list from DOM and adding the updated comment list
    commentSection.innerHTML = "";
    displayComment(newComment);
    clear();
  }
});

// Listing the comments in first render
displayComment();
