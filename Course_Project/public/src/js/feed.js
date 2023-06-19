var shareImageButton = document.querySelector('#share-image-button')
var createPostArea = document.querySelector('#create-post')
var closeCreatePostModalButton = document.querySelector(
    '#close-create-post-modal-btn'
)
var sharedMomentsArea = document.querySelector('#shared-moments')

function openCreatePostModal() {
    createPostArea.style.display = 'block'
    if (deferredPrompt) {
        deferredPrompt.prompt()

        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome)

            if (choiceResult.outcome === 'dismissed') {
                console.log('User cancelled installation')
            } else {
                console.log('User added to home screen')
            }
        })

        deferredPrompt = null
    }
}

function closeCreatePostModal() {
    createPostArea.style.display = 'none'
}

shareImageButton.addEventListener('click', openCreatePostModal)

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal)

// function onSaveButtonClick(e) {
//   console.log(e);
//   if('caches' in window) {
//     caches.open('user-requested')
//         .then((caches) => {
//           caches.add('https://httpbin.org/get');
//           caches.add('/src/images/sf-boat.jpg');
//         })
//
//   }
// }

function clearCards() {
    while (sharedMomentsArea.hasChildNodes()) {
        sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
    }
}

function createCard() {
    var cardWrapper = document.createElement('div')
    cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp'
    var cardTitle = document.createElement('div')
    cardTitle.className = 'mdl-card__title'
    cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")'
    cardTitle.style.backgroundSize = 'cover'
    cardTitle.style.height = '180px'
    cardWrapper.appendChild(cardTitle)
    var cardTitleTextElement = document.createElement('h2')
    cardTitleTextElement.className = 'mdl-card__title-text'
    cardTitleTextElement.textContent = 'San Francisco Trip'
    cardTitle.appendChild(cardTitleTextElement)
    var cardSupportingText = document.createElement('div')
    cardSupportingText.className = 'mdl-card__supporting-text'
    cardSupportingText.textContent = 'In San Francisco'
    cardSupportingText.style.textAlign = 'center'

    // var cardSaveButton = document.createElement('button')
    // cardSaveButton.textContent = "Save"
    // cardSaveButton.addEventListener("click", onSaveButtonClick)
    // cardSupportingText.appendChild(cardSaveButton);

    cardWrapper.appendChild(cardSupportingText)
    componentHandler.upgradeElement(cardWrapper)
    sharedMomentsArea.appendChild(cardWrapper)
}
var networkDataRecived =false;

fetch('https://httpbin.org/get')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        networkDataRecived = true;
        console.log('data web', data);
        clearCards()
        createCard()
    })
    .catch(err => {
        console.log('fetch err');
    })

if ('caches' in window) {
    caches
        .match('https://httpbin.org/get')
        .then((res) => {
            if (res) {
                return res.json()
            }
        })
        .then((data) => {
            console.log(data)
            if(!networkDataRecived) {
                console.log('cash');
                clearCards()
                createCard()
            }
        })
}
