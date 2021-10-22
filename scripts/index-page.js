const commentsList = document.querySelector('.comments__cards');

const domainName = `https://project-1-api.herokuapp.com`;
const API_key = '0419780e-8dd8-49c0-9e55-898d29814a69';

// axios.get(`${domainName}/comments?api_key=${API_key}`).then((response) => {
//     console.log('Comments', response.data);
// });

// create function 
function displayComment() {

    axios.get(`${domainName}/comments?api_key=${API_key}`).then((response) => {
        // sort the objects in the array by date
		const sortedComments = response.data.sort(function (a, b) { 
            return b.timestamp - a.timestamp;
        });

        console.log('Sorted COmments:', sortedComments);

        sortedComments.forEach(function (comment) {
            // create <li>
            const commentsItem = document.createElement('li');
            commentsItem.classList.add('comments__card');

            //create <div>
            const leftDiv = document.createElement('div');
            leftDiv.classList.add('comments__card--left');

            //create <image>
            const commentsImage = document.createElement('img');
            commentsImage.classList.add('comments__card--image');

            //create <div>
            const rightDiv = document.createElement('div');
            rightDiv.classList.add('comments__card--right');

            //create <div>
            const topDiv = document.createElement('div');
            topDiv.classList.add('comments__card--top');

            //create <h4>
            const commentsName = document.createElement('h4');
            commentsName.innerText = comment.name;
            commentsName.classList.add('comments__card--name');

            // create <p>
            const commentsDate = document.createElement('p');
            commentsDate.innerText = new Date(comment.timestamp)
                .toLocaleString()
                .split(',')[0];
            commentsDate.classList.add('comments__card--date');

            //create <div>
            const bottomDiv = document.createElement('div');
            bottomDiv.classList.add('comments__card--bottom');

            const commentsText = document.createElement('p');
            commentsText.innerText = comment.comment;
            commentsText.classList.add('comments__card--text');

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
    });
}

function createCommentObject(name, comment) {
    const commentObject = {
        name: name,
        comment: comment
    };
    axios
        .post(`${domainName}/comments?api_key=${API_key}`, commentObject)
        .then((response) => {
            //console.log('Comment posted successsfully.');

            //Clearing the list from DOM and adding the updated comment list
            let commentSection = document.querySelector('.comments__cards');
            commentSection.innerHTML = '';
            displayComment();
            clear();
        })
        .catch((error) => {
            console.log('Error in posting new comment', error);
        });
}
// Clears the input fields after submitting a new comment
function clear() {
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
}

// Event Listeners for handling input active and error state
const nameField = document.getElementById('name');
const commentField = document.getElementById('comment');

nameField.addEventListener('input', function (e) {
    if (e.target.value) {
        document.querySelector('.comments__form--name').style.border =
            '1px solid #323232';
    }
});

commentField.addEventListener('input', function (e) {
    console.log(e.target.value);
    if (e.target.value) {
        document.querySelector('.comments__form--text').style.border =
            '1px solid #323232';
    }
});

// Event Listener for handling form submission
const form = document.getElementById('comments__form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = e.target.name.value;
    const comment = e.target.comment.value;

    if (!name || !comment) {
        if (!name) {
            document.querySelector('.comments__form--name').style.border =
                '1px solid #d22d2d';
        }
        if (!comment) {
            document.querySelector('.comments__form--text').style.border =
                '1px solid #d22d2d';
        }
    } else {
        //creating new comment object
        createCommentObject(name, comment);
    }
});

// Listing the comments in first render
displayComment();
