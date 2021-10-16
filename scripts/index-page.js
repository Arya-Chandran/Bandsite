
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

    //create <image>
    const commentsImage = document.createElement("img");
    commentsImage.classList.add("comments__card--image");

    //create <h4>
    const commentsName = document.createElement("h4");
    commentsName.innerText = comment.personName;
    commentsName.classList.add("comments__card--name");

    // create <p>
    const commentsDate = document.createElement("p");
    commentsDate.innerText = new Date(comment.timeStamp) .toLocaleString() .split(",")[0];
    commentsDate.classList.add("comments__card--date");

    const commentsText = document.createElement("p");
    commentsText.innerText = comment.comment;
    commentsText.classList.add("comments__card--text");

    // append create elements  to commentsItem
    commentsItem.appendChild(commentsImage);
    commentsItem.appendChild(commentsName);
    commentsItem.appendChild(commentsDate);
    commentsItem.appendChild(commentsText);

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

//clears the input fields after submitting a new comment
function clear() {
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

// Event Listener for handling form submission
const form = document.getElementById("commentForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = e.target.name.value;
  const comment = e.target.comment.value;
  let commentSection = document.querySelector(".comments__cards");

  //creating new comment object
  const newComment = createCommentObject(name, comment);

  //Clearing the list from DOM and adding the updated comment list
  commentSection.innerHTML = "";
  displayComment(newComment);
  clear();
});

// Listing the comments in first render
displayComment();
