/*!
 * James.js v0.1.0
 * https://github.com/mashiku7/JAMES.ai
 *
 * Copyright (c) 2017 Melchizedek Mashiku, Michael Bowler
 * Released under the MIT license
 * Dependencies: Jquery, Ajax, nlp-compromise, Google Speech Recognition
 * <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
 * <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
 * 
 */


// J.A.M.E.S Library

/////////////////////////////////////
import $ from 'jquery';
import { nlp } from './modules/compromise';
//////////////////////////////////////


class JAMES{

    //////////////////////////////////////////
    constructor(options){
        this.videoId = "";
        this.questionasked = options.questionasked;
        this.searchString = "";
        this.final_input_transcript = "";
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////

    
    //this.searchString = this.searchString.toLowerCase();


    
    //var transcripts = [];// for firebase integration in the future
    static downloadprocessTranscripts(searchStringParam, videoID){
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "https://video.google.com/timedtext?lang=en&v="+ videoID,
                dataType: "xml",
                success: xmlParser
               });
            });
            
            function xmlParser(xml) {
              //console.log(xml);
                console.log($(xml).find('transcript').text());
                var result = $(xml).find( "transcript:contains(" + "\"" + searchStringParam + "\")" ).length > 0;
                console.log(result);
                var timestamp = $(xml).find( "transcript text:contains(" + "\"" + searchStringParam + "\")" ).attr("start");
                console.log(timestamp);
                JAMES.formatResultOutput(timestamp, JAMES.updateResultUrl);
            }
      }

    static GetYouTubeID(callback){ 
                var url = callback; 
                var ID = '';
                url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if(url[2] !== undefined) {
                ID = url[2].split(/[^0-9a-z_\-]/i);
                ID = ID[0];
                }else {
                ID = url;
            }
        return ID;
    }
    static GetYouTubeLink(){
        //Need to search doc for youtube video links
        //Check if this is youtube else look for youtubelink within the document.
        var resulturl;
        var urlRegexSubStr = "https://www.youtube.com/watch?v=";
        var urlRegexSubStr2 = "https://www.youtube.com/embed/";
        if((document.location.href).indexOf(urlRegexSubStr) !== -1){
            console.log("Youtube link:"+document.location.href+" ready for IRIS processing"); 
            resulturl = document.location.href;
        }else{
            var link = document.location.href;
                if (link.indexOf(urlRegexSubStr2) !== -1) {
                    resulturl = link;
                    // ...if it matches, send a message specifying a callback too
                }
            }
            return resulturl;
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //1. Get question input with speech recognition and NLP

    //var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    static startButton(event){
    var recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = function(event) {
      if (event.results.length > 0) {
        this.final_input_transcript = event.results[0][0].transcript;
        // Analyze sentences at a basic level
        // ------------------------------------- //
        
        var nlpworker = "window.nlp();";
        window.location = "javascript:" + nlpworker;
        let ans = window.nlp(this.final_input_transcript).nouns();
        this.searchString = ans.out('text');
        this.videoId = JAMES.GetYouTubeID(JAMES.GetYouTubeLink());
        JAMES.downloadprocessTranscripts(this.searchString, this.videoId);
      }
    }
    }
    

        

    //2. Format the result for appropriate use
            static formatResultOutput(timeresult, callback){
                this.videoId = JAMES.GetYouTubeID(JAMES.GetYouTubeLink());
                var url = JAMES.GetYouTubeLink();
                var urlRegexSubStr2 = "https://www.youtube.com/embed/";
                var resulturl ="";
                if(url.indexOf(urlRegexSubStr2) !== -1){
                    resulturl = "https://www.youtube.com/embed/"+ this.videoId +"/?controls=1&enablejsapi=1&modestbranding=1&showinfo=0&origin=https%3A%2F%2Fwww.khanacademy.org&iv_load_policy=3&html5=1&autoplay=1&fs=1&rel=0&hl=en&cc_lang_pref=en&cc_load_policy=1&start="+Math.trunc(timeresult);
                    console.log(resulturl);
                    console.log("Ready to dynamic load embeded youtube video");
                    callback(resulturl);
                }else{
                    resulturl = "https://www.youtube.com/watch?v="+ this.videoId +"&start="+Math.trunc(timeresult);
                    console.log(resulturl);
                    console.log("Ready to dynamic load youtube page");
                    callback(resulturl);
                }
            }
    //3. This is a callback funtion to update url and display the answer for the user. 
            //   use AJAX for asynch url page update
            static updateResultUrl(newUrl){
                location.replace(newUrl);//change the location of the page with resulturl
                ///////////////////////////////////////////////////////////////////
                //Updates youtube player iframes
                $(document).on('click', '.ph-video', function (event) {
                    var change = $(this).find("img").attr("src").split("/");
                    $(".ph-master-video-section > iframe").attr("src", newUrl);
                });
                ///////////////////////////////////////////////////////////////////
                console.log("JAMES answered the question and updated the DOM");
            }

}
export { JAMES as default};