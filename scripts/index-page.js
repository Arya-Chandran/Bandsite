let commentSection = document.querySelector('.comments__cards');

const domainName = `https://project-1-api.herokuapp.com`;
const API_key = '5b4055af-d305-432e-adc3-1caa3789ce36';

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

            //create <div>
            const iconDiv = document.createElement('div');
            iconDiv.classList.add('comments__card--icon');

            const commentsLike = document.createElement('button');
            commentsLike.innerText = comment.likes + ' Likes';
            commentsLike.classList.add('comments__card--like');

            const commentsDelete = document.createElement('button');
            commentsDelete.innerText = 'Delete';
            commentsDelete.classList.add('comments__card--delete');

            // append create elements  to commentsItem
            leftDiv.appendChild(commentsImage);
            commentsItem.appendChild(leftDiv);
            topDiv.appendChild(commentsName);
            topDiv.appendChild(commentsDate);
            rightDiv.appendChild(topDiv);
            bottomDiv.appendChild(commentsText);
            rightDiv.appendChild(bottomDiv);
            iconDiv.appendChild(commentsLike);
            iconDiv.appendChild(commentsDelete);
            rightDiv.appendChild(iconDiv);
            commentsItem.appendChild(rightDiv);

            // finally append all the <li> elements to commentsList
            commentSection.appendChild(commentsItem);

            // adding eventListener for like button
            commentsLike.addEventListener('click', () => {
                likeComment(comment.id)
                    .then((likes) => {
                        if (likes) {
                            commentsLike.innerText = likes + ' Likes';
                        }
                    })
                    .catch((err) => {
                        console.log('Like count failed to update.');
                    });
            });

            // adding eventListener for delete button
            commentsDelete.addEventListener('click', () => {
                deleteComment(comment.id)
                    .then(() => {
                        commentsItem.remove();
                    })
                    .catch((err) => {
                        console.log('Delete failed to update.');
                    });
            });
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
            //Clearing the list from DOM and adding the updated comment list
            commentSection.innerHTML = '';
            displayComment();
            clear();
        })
        .catch((error) => {
            console.log('Error in posting new comment', error);
        });
}

function likeComment(id) {
    return new Promise(function (resolve, reject) {
        const likes = axios
            .put(`${domainName}/comments/${id}/like?api_key=${API_key}`)
            .then((response) => {
                console.log(response);
                return response.data.likes;
            })
            .catch((error) => {
                console.log('Error in updating like comment', error);
                reject(false);
            });
        resolve(likes);
    });
}

function deleteComment(id) {
    return new Promise(function (resolve, reject) {
        axios
            .delete(`${domainName}/comments/${id}?api_key=${API_key}`)
            .then((response) => {
                console.log(
                    `Deleted the comment: ${id} sucessfully`,
                    response.data
                );
                resolve();
            })
            .catch((error) => {
                console.log('Error in updating delete comment', error);
                reject();
            });
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
