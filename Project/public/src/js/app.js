var defferedPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service worker registered!');
        });
}

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    defferedPrompt = e;
    return false;
})


