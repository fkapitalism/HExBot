//This function goes to the page especified by path
function goToPage(path) {
    var currentUrl = window.location.href;
    newUrl = currentUrl.split("/");
    newUrl = newUrl[0] + "//" + newUrl[2] + path;
    window.location.href = newUrl;
}
