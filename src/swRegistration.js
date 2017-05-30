;(function(){
    var swRegistration = null;

    if (('serviceWorker' in navigator)) {
        console.log('Service worker supported');
        navigator.serviceWorker.register('sw.js')
            .then(function(registration){
                swRegistration = registration;
                console.log("Service worker registered!", registration);
            }).catch(function(reason){
                console.warn('Can not register service worker', reason);
            });
    }			
})();