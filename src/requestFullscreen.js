export default function requestFullscreen(element){
    if (element.requestFullscreen) { // W3C API
        return element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Mozilla current API
        return element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) { // Webkit current API
        return element.webkitRequestFullScreen();
    } // Maybe other prefixed APIs?
    return false;
}
