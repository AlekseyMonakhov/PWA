var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if(defferedPrompt) {
    defferedPrompt.prompt()
    defferedPrompt.userChoice.then((choise) => {
      console.log(choise);

      if(choise.outcome === "dismissed") {
        console.log('canceled')
      }else{
        console.log('added')
      }

      defferedPrompt = null;
    })
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
