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

////////////////////////////////////////////////////////////

//Handle Iframe allow="microphone" for khan academy

///////////////////////////////////////////////////////////
let configs ={
    API_KEY: "",
    questionasked: false
}
const James = new JAMES(configs);

document.getElementById("James.btn").onclick = JAMES.startButton;

//////////////////////////////////////////////////////////////
var checkExist = setInterval(function() {
    if ($('div.docs-bubble.docs-linkbubble-bubble a').length) {
       console.log("Exists!");
       Init_gdk_miniyoutube(gdk_miniyoutube);
       clearInterval(checkExist);
    }
 }, 100);

var floated = false;
var ID = "";

function Init_gdk_miniyoutube(callback){
//Create a function to find the link then once you click or hover over the link the 
//pop up video appears and then I am able to display the video or the iframe with the 
//video
//first find is the link if there
//second if there place an id on that span
//third mouseup on ided span will trigger things
//forth getyoutubelink and find the utube id of the video
// fifth start the miniutube window/iframe
var links = $("div.docs-bubble.docs-linkbubble-bubble a"); 
var gdk_regx = new RegExp("(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)");
var checkLink = links.filter(function () {
    return gdk_regx.test($(this).text()); 
});
if( checkLink !== -1){
    $("div.docs-bubble.docs-linkbubble-bubble a").on("mouseout", function() {
        //this == the link that was clicked
        var href = $(this).attr("href");
        if(href.match(gdk_regx)){
            var start_gdk = confirm("Allow JAMES to display video");
            if(start_gdk == true){
                floated = true;
                ID = JAMES.GetYouTubeID(href);
                callback(ID);
            }
        }
    });
}else{
    //no link found 
    console.log("gdk_miniyoutube not working");
}
}


function gdk_miniyoutube(gdkinput){
$(document).ready(function() {
    // Handle dragging.

    var originalHeight;
    var originalWidth;
    var miniScreenLastTop;
    var miniScreenLastLeft;
    var miniScreenLastHeight;
    var miniScreenLastWidth;
    var start;
    var longpress = 100;
    var dragStartX, dragStartY, dragStartWidth, dragStartHeight, dragRatio;
    var maxWidth = 854;
    var minWidth = 310;
    var resizing = false;
    var flashAlertShown = false;
    var miniYouTubeActivated = true;

    var PAGE_TOP_MARGIN_PX = 60;

    // A list of predefined sizes of the screen
    var SMALL_WIDTH = 310;
    var SMALL_HEIGHT = 175;
    var MEDIUM_WIDTH = 475;
    var MEDIUM_HEIGHT = 268;
    var LARGE_WIDTH = 640;
    var LARGE_HEIGHT = 360;
    var EXTRA_LARGE_WIDTH = 854;
    var EXTRA_LARGE_HEIGHT = 480;

    // A list of constants
    var MINI_SCREEN_LAST_TOP = 'miniScreenLastTop';
    var MINI_SCREEN_LAST_LEFT = 'miniScreenLastLeft';
    var MINI_SCREEN_LAST_HEIGHT = 'miniScreenLastHeight';
    var MINI_SCREEN_LAST_WIDTH = 'miniScreenLastWidth';
    var MINI_YOUTUBE_ID = '#miniyoutube';
    var VIDEO_STREAM_CLASS = '.video-stream';

    // Preload images
    preloadImage("https://raw.githubusercontent.com/jianweichuah/miniyoutube/master/images/pin.png");
    preloadImage("https://raw.githubusercontent.com/jianweichuah/miniyoutube/master/images/brCorner.png");

    // Read from the storage to see if the settings exist.
    // If yes, populate the variables
    // getMiniScreenPositions();

    (function($) {
        $.fn.drags = function(opt) {

            opt = $.extend({handle:"",cursor:"move"}, opt);

            if(opt.handle === "") {
                var $el = this;
            } else {
                var $el = this.find(opt.handle);
            }

            return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
                // If the clicked div is resizer, don't make it draggable.
                if(e.target.className === "resizer" ||
                   e.target.className === "mnyt-size-button" ||
                   e.target.className === "mnyt-pin-img" ||
                   e.target.className === "mnyt-progress-area" ||
                   e.target.className === "mnyt-play-button" ||
                   e.target.className === "mnyt-play-button-play" ||
                   e.target.className === "mnyt-play-button-pause" ||
                   e.target.className === "mnyt-progress-area" ||
                   e.target.className === "mnyt-progress-bar mnyt-progress" ||
                   e.target.className === "mnyt-progress-wrap mnyt-progress" ||
                   e.target.className === "mnyt-progress-pointer")
                {
                    return false;
                }

                var $drag = $(this).addClass('draggable');

                var z_idx = $drag.css('z-index'),
                    drg_h = $drag.outerHeight(),
                    drg_w = $drag.outerWidth(),
                    pos_y = $drag.offset().top + drg_h - e.pageY,
                    pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 1000);

                $(window).on("mousemove", function(e) {
                    // Prevent going out of screen horizontally.
                    var left = e.pageX + pos_x - drg_w;
                    if (left < 5) {
                        left = 5;
                    } else if (left > $(window).width() - drg_w - 5) {
                        left = $(window).width() - drg_w - 5;
                    }

                    // Prevent going out of screen vertically.
                    var top = e.pageY + pos_y - drg_h;
                    if (top < $(document).scrollTop() + PAGE_TOP_MARGIN_PX) {
                        top = $(document).scrollTop() + PAGE_TOP_MARGIN_PX;
                    } else if (top > $(document).scrollTop() + $(window).height() - drg_h - 5) {
                        top = $(document).scrollTop() + $(window).height() - drg_h - 5;
                    }

                    $('.draggable').offset({
                        top: top,
                        left: left
                    }).on("mouseup", function() {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                    });
                }).on("mouseup", function() {
                    $(window).unbind('mousemove');
                    $(this).removeClass('draggable');
                });

                e.preventDefault(); // disable selection
            });
        }
    })($);


    if (floated === true) {
        // 1. Create the mini screen div to hold the video
        var $miniScreen = $('<div id="miniyoutube"></div');

        // Put the screen back to its last position, if defined.
        // Else default to top right.
        var miniScreenTop = 60;
        var miniScreenHeight = 175;
        var miniScreenLeft = $(window).width() - 380;
        var miniScreenWidth = 310;

        if (miniScreenLastTop && miniScreenLastHeight &&
            miniScreenLastLeft && miniScreenLastWidth &&
            miniScreenLastLeft + miniScreenLastWidth <= $(window).width() &&
            miniScreenLastTop + miniScreenLastHeight <= $(window).height()) {

            miniScreenTop = miniScreenLastTop;
            miniScreenHeight = miniScreenLastHeight;
            miniScreenLeft = miniScreenLastLeft;
            miniScreenWidth = miniScreenLastWidth;
        }

        $miniScreen.css('top', miniScreenTop);
        $miniScreen.css('left', miniScreenLeft);
        $miniScreen.height(miniScreenHeight);
        $miniScreen.width(miniScreenWidth);

        // 2. Grab the video element
        var $video = $(VIDEO_STREAM_CLASS);
        $video.addClass('mnyt-video');

        // 4. Store the current width and height to restore later
        originalWidth = $video.width();
        originalHeight = $video.height();

        // 5. Wrap the video into the small element div
        $video.wrap($miniScreen);

        // Move the div to the top level body.
        // *This is needed in Chrome after the update on 9 October 2016.
        $(MINI_YOUTUBE_ID).appendTo('body');
        // Add resizers to the right corners of the div
        var JamesGDK_UI = '<div class="mnyt-controls">\
                            <div class="resizer" id="mnyt-br"></div>\
                            <iframe width="420" height="315" src=https://www.youtube.com/embed/'+ 
                            gdkinput +'?autoplay=1" allow="microphone"></iframe>\
                            <button class="mnyt-size-button" id="mnyt-close-button">X</button>\
                            </div>';
         
        $('body').append($miniScreen);
        $(MINI_YOUTUBE_ID).append(JamesGDK_UI);
        $("#James").hide();

        // 6. Modify clicking to differentiate long vs short clicks.
        $(MINI_YOUTUBE_ID).on('mouseover', function(e) {
            $('.mnyt-control-icons').show();
            $('#mnyt-close-button').show();
        });
        $(MINI_YOUTUBE_ID).on('mouseleave', function(e) {
            start = 0;
            $('.mnyt-control-icons').hide();
            $('#mnyt-close-button').hide();
        });
        $(MINI_YOUTUBE_ID).on('mouseup', function(e) {
            if (resizing == true) {
                stopDrag(e);
            }
            return false;
        });
        $(MINI_YOUTUBE_ID).click(function() {
            return false;
        });
        // Disable double click to full screen.
        $(MINI_YOUTUBE_ID).dblclick(function() {
            return false;
        });

        // 8. Set the width and height of the video to fit the div
        $video.css('width', miniScreenWidth);
        $video.css('height', miniScreenHeight);

        // 9. Activate the draggable feature of the small screen
        $(MINI_YOUTUBE_ID).drags();

        // 10. Set flag to true
            //flag is set in the trigger function

        // Add listeners for the controls
        $('#mnyt-small-button').click(handleTransitionSmall);
        $('#mnyt-medium-button').click(handleTransitionMedium);
        $('#mnyt-large-button').click(handleTransitionLarge);
        $('#mnyt-extra-large-button').click(handleTransitionExtraLarge);
        //$('#mnyt-play-button').click(toggleVideo);

        // Save the position and size of the screen if pin button is clicked
        //$('#mnyt-pin-button').click(pinButtonClicked);
        $('#mnyt-close-button').click(closeButtonClicked);

        // Add listener for the resizers
        $('.resizer').bind('mousedown.resizer', initDrag);
        $('.resize-icon').bind('mousedown.resizer', initDrag);

        // Add listener for the progress bar
        $('.mnyt-progress-area').hover(handleProgressHoverIn, handleProgressHoverOut);
        $('.mnyt-progress-area').click(handleVideoProgress);

    }

    // Update the size of the screen to small
    function handleTransitionSmall() {
    resizeScreen(SMALL_WIDTH, SMALL_HEIGHT);
    }

    function handleTransitionMedium() {
    resizeScreen(MEDIUM_WIDTH, MEDIUM_HEIGHT);
    }

    function handleTransitionLarge() {
    resizeScreen(LARGE_WIDTH, LARGE_HEIGHT);
    }

    function handleTransitionExtraLarge() {
    resizeScreen(EXTRA_LARGE_WIDTH, EXTRA_LARGE_HEIGHT);
    }

    function resizeScreen(newWidth, newHeight) {
    if ($(MINI_YOUTUBE_ID).width() == newWidth) {
    return false;
    }

    $(MINI_YOUTUBE_ID).animate({'width':newWidth, 'height':newHeight}, 300);
    $(VIDEO_STREAM_CLASS).animate({'width':newWidth, 'height':newHeight}, 300);
    }

    
    // Get the video player and calculate the progress
    $video = $(VIDEO_STREAM_CLASS).get(0);

    // If the video has ended and the screen is still around, clear it.
    // if (floated == true && $video.currentTime == $video.duration) {
    // putBackMiniScreen();
    // return false;
    // }


    function initDrag(e) {
    resizing = true;
    // Store the initial values to calculate new size later
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartWidth = $(MINI_YOUTUBE_ID).width();
    dragStartHeight = $(MINI_YOUTUBE_ID).height();
    dragRatio = dragStartHeight/dragStartWidth;
    // Add event listeners to perform resize
    $(window).mousemove(doDrag);
    $(window).mouseup(stopDrag);
    e.preventDefault();

    return false;
    }

    function doDrag(e) {
    // if not resizing, do nothing
    if (resizing == false) {
    return false;
    }

    var newWidth = dragStartWidth + e.clientX - dragStartX;
    // Experimental: Allow manually resizing to bigger screen sizes.
    // Make sure the new width does not exceed the max width
    // if (newWidth > maxWidth) {
    //     newWidth = maxWidth;
    // }
    if (newWidth < minWidth) {
    newWidth = minWidth;
    }

    var newHeight = Math.round(newWidth * dragRatio);
    $(MINI_YOUTUBE_ID).width(newWidth);
    $(MINI_YOUTUBE_ID).height(newHeight);
    // Added to also resize the video after the YouTube update
    $(VIDEO_STREAM_CLASS).width(newWidth);
    $(VIDEO_STREAM_CLASS).height(newHeight);
    e.preventDefault();

    return false;
    }

    function stopDrag(e) {
    // Set the flag to false
    resizing = false;
    // Remove the listensers
    $(window).unbind('mousemove');
    return false;
    }

    function preloadImage(url) {
    var img=new Image();
    img.src=url;
    }

    function removeMiniScreen() {
    // 1. Grab the video element
    $video = $(VIDEO_STREAM_CLASS);

    // 3. Take away the parent.
    $video.removeClass('mnyt-video');

    // 4. Set flag to false
    floated = false;
    }

    function closeButtonClicked() {
    $('#James').show();
    $('#miniyoutube').remove();
    floated = false;
    // Send message to disable Mini YouTube
    // browser.runtime.sendMessage({"update_icon": false});
    }
});
}