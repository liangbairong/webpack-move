require("../css/style.css")

module.exports = function () {
    var greet = document.createElement('div');
    greet.textContent = "Hi t and greetings!";
    return greet;
};