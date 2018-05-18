import $ from 'jquery';
import handlers from './modules/handlers';
import msg from './modules/msg';
import JAMES from './James.class.js';
import MaterialDesignLite from './material.min.js';

// here we use SHARED message handlers, so all the contexts support the same
// commands. but this is NOT typical messaging system usage, since you usually
// want each context to handle different commands. for this you don't need
// handlers factory as used below. simply create individual `handlers` object
// for each context and pass it to msg.init() call. in case you don't need the
// context to support any commands, but want the context to cooperate with the
// rest of the extension via messaging system (you want to know when new
// instance of given context is created / destroyed, or you want to be able to
// issue command requests from this context), you may simply omit the
// `handlers` parameter for good when invoking msg.init()

console.log('CONTENT SCRIPT WORKS!'); // eslint-disable-line no-console

msg.init('ct', handlers.create('ct'));

//console.log('jQuery version:', $().jquery); // eslint-disable-line no-console

//////////////////////////////////////////////////////////////////////////////////
var mdl = document.createElement("SCRIPT");
mdl.src ="https://code.getmdl.io/1.3.0/material.min.js";
mdl.defer;
componentHandler.upgradeElement(mdl);
document.getElementsByTagName("body")[0].appendChild(mdl);

var mdl_icon = document.createElement("SCRIPT");
mdl_icon.src ="https://fonts.googleapis.com/icon?family=Material+Icons";
componentHandler.upgradeElement(mdl_icon);
document.getElementsByTagName("body")[0].appendChild(mdl_icon);

var nlp_compromise = document.createElement("SCRIPT");
nlp_compromise.src = "https://unpkg.com/compromise@latest/builds/compromise.es6.min.js";
componentHandler.upgradeElement(nlp_compromise);
document.getElementsByTagName("body")[0].appendChild(nlp_compromise);

var div = document.createElement('div');
div.id = "James";
componentHandler.upgradeElement(div);
var button = document.createElement('button');
var icon = document.createElement("I");
icon.className = "material-icons";
icon.innerHTML ="microphone";
componentHandler.upgradeElement(icon);
button.appendChild(icon);
button.id = "James.btn";
button.className = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color--red-A700';
componentHandler.upgradeElement(button);
div.appendChild(button);
componentHandler.upgradeElement(div);
document.getElementsByTagName("body")[0].appendChild(div);

///////////////////////////////////////////////////////////
let configs ={
    API_KEY: "",
    questionasked: false
}
const James = new JAMES(configs);

document.getElementById("James.btn").onclick = JAMES.startButton;

///////////////////////////////////////////////////////////