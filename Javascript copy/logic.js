
var selectedOption = null;


$(document).ready(function() {
    function showMenu () {
        $(this).hide();
        var options = ['--', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'];
        var createDrop = $("<select name='stateAbb' id='state'>")
    
        createDrop.change(function(){
            $(".stuff").empty();
            $(".starInfo").empty();
            selectedOption = $('#state>option:selected').text();
            console.log(selectedOption);
            displayInfo();
            
        });

        for(var i = 0; i < options.length; i ++){
            var addOption = $("<option>")
            addOption.text(options[i]);
            createDrop.append(addOption);
            // $('options option:selected');
            // console.log(options[i]);
        }
          $('#options:selected').text();
          $(".state-container").append(createDrop);
    };

    //GLOBAL VARIABLES
    //==================================================

    var questionsArray = [
        {
            id: "state",
        question: "What state were you wanting to vist?", 
        
    }, 
        
];
    //MAIN
    //=================================================

    $(".btn-begin").click(function() {
        $(this).hide();
        $(ready).hide();
        showMenu();
    });

    
    {
       ////Create div to add the questions to
    var answerDiv;
    var answerArray = [];
    var userChoice;
    var userAnswers = [];
    var answerOptionDiv;
    var addAnswer;
    var finishedAnswer;
    var stateDropDiv;
    var createList;
    var choiceObj
    

    // //CAPTURE ANSWER SELECTED BY USER AND SHOW NEXT QUESTION
    // $("body").on("click", ".userChoice", function(){
    //     console.log(this);
    //     userChoice = $(this).attr("answeranswer");
    //     console.log("USER CHOICE IS: " + userChoice);
    //     var choiceObj = {
    //         id: $(this).parent().parent().find(".questionClass").attr("data-id"),
    //         choice: userChoice
    //     };

    //     userAnswers.push(choiceObj);
    //     console.log(choiceObj);
    //     console.log("Here is the users answers: " + userAnswers);
    //     $(".stuff").empty();

        
    //     pickQuestion();
    // })

     //FUNCTIONS
    //=================================================

    // //FUNCTION TO PICK A QUESTION
    // function pickQuestion() {
    //     console.log("THIS IS # ANSWERED: " + answeredQuestionsArray.length);
    //     if (answeredQuestionsArray.length !== 5) {
    //     randomQuestion = Math.floor(Math.random()*questionsArray.length);
    //     questions = questionsArray[randomQuestion];
    //     questionsArray[randomQuestion] = questionsArray[0];
    //     answeredQuestionsArray.push(questions.question);
    //     questionsArray.shift()
        
    //     console.log("QUESTIONS ARRAY: " + questionsArray);
    //     console.log("ANSWERED QUESTIONS: " + answeredQuestionsArray);

    //     questionDiv = $("<div>");
    //     questionDiv.addClass("questionClass");
    //     questionDiv.attr('theQuestions', questions.question);
    //     questionDiv.attr("data-id", questions.id);
    //     questionDiv.append(questions.question);
    //     $(".stuff").append(questionDiv);
    //     showAnswers();
    //     } else(displayInfo());
        
    
    //FUNCTION TO DISPLAY PARK INFO
    function displayInfo() {
        var state = "";

        
        // for (var i=0; i < userAnswers.length; i++) {
        //     if (userAnswers[i].id === "state") {
        //         state = userAnswers[i].choice;
        //     }
        // }


        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectedOption + "&fields=images&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);  
            
            var dataArray = [];

            for (var k = 0; k < response.data.length; k++ ){

                var createName = $("<button class='parkButton'>");
                createName.text(response.data[k].name);
                createName.attr("data-name", response.data[k].name);
                createName.attr("data-description", response.data[k].description);
                createName.attr("data-latLong", response.data[k].latLong);

                if(response.data[k].images[0])  {
                    createName.attr("data-image", response.data[k].images[0].url);
                }

                // console.log(createName);
                $(".stuff").append(createName);

            }

            // for (var z = 0; z < dataArray.length; z++) {
            //         console.log(dataArray);
            //     // console.log(dataArray.length);
            //     // console.log(dataArray[z].name);
            //     // console.log(dataArray[z].description);
            //     // console.log(dataArray[z].latLong)

            //     latLongString = dataArray[z].latLong;
            //     latLong = latLongString.split(', ');
            
            //     console.log(latLong);
            //     // console.log(latLong[0]);
            //     // console.log(latLong[1]);
    
            //     latitude = latLong[0];
            //     longitude = latLong[1];

            //     latSplit = latitude.split(":")[1];
            //     console.log("Latitude: " + latSplit);
            //     console.log(latSplit);
            //     lat = latSplit;
            //     console.log(lat);

            //     longSplit = longitude.split(":")[1];
            //     console.log("Longitude: " + longSplit);
            //     console.log(longSplit);
            //     long = longSplit;
            //     console.log(long);
            // }

            for (var j = 0; j < response.data.length; j++ ){

                $(".park-information").append("<p>" + "<b>" + response.data[j].fullName + "</b>" + "</p>");
                $(".park-information").append("<p>" + response.data[j].states + "</p>");
                if(response.data[j].images[0]){
                    var imgURL = response.data[j].images[0].url;
                    var image = $("<img>").attr("src", imgURL);
                    $(".park-information").append(image);
                }
                $(".park-information").append("<p>" + response.data[j].description + "</p>");
                $(".park-informtion").append("<p>" + response.data[j].weatherInfo + "</p>");
                var latLong = response.data[j].latLong;
                // $(".stuff").append("<p>" + response.data[j].latLong + "</p>");
                console.log(latLong);
                if(latLong !== undefined && !!latLong){
                    var vars = latLong.split(",");
                    var lat = parseFloat(vars[0].split(":")[1]);
                    var long = parseFloat(vars[1].split(":")[1]);
                    // $(".stuff").append("<p>Lat: " + lat + ", Long: "+ long +"</p>");
                    var obj = {
                        lat: lat,
                        lng: long
                    };
                    var id=  "Map" + Math.floor(Math.random()*10000);
                    $(".park-information").append("<p class='map' id='"+id+"'></p>");
                    google.maps.event.addDomListener(window, "load", createMap(obj, id));
                    //createMap(obj,id);
                }
            }
            });

        // var response = response.data;
        // $(".stuff").append(finishedAnswer);
    }}

    // //FINAL DISPLAY
    // function finalDisplay() {
    //     $(".stuff").empty();

    //     var finalTitle = $("<h2>").text(choiceObj.name);
    //     var finalImage = $("<img class='finalImage' src=" + choiceObj.image + ">")
    //     var finalDescription = $("<p>").text(choiceObj.description);
    //     var latLongResponse = choiceObj.latLong;

    //     console.log(choiceObj.latLong);
    //     console.log(latLongResponse);

    //     var vars = latLongResponse.split(",");
    //     var lat = parseFloat(vars[0].split(":")[1]);
    //     var long = parseFloat(vars[1].split(":")[1]);

    //     $(".stuff").append(finalTitle);
    //     $(".stuff").append(finalImage);
    //     $(".stuff").append(finalDescription);

        
    //     console.log(lat);
    //     console.log(long);
    //     var queryURL2 = "http://www.astropical.space/astrodb/api-ephem.php?lat=" + lat + "&lon=" + long + "";
    //     console.log(queryURL2);
    //     $.ajax({
    //         url: queryURL2,
    //         method: "GET"
    //         }).then(function(response2) {

    //             $(".starInfo").empty();
    //             $(".map").hide();

    //             console.log(lat);
    //             console.log(long);

    //             console.log(JSON.parse(response2));
    //             var data2 = JSON.parse(response2);


                
    //             var latLongResponse = choiceObj.latLong;
    //             console.log(latLongResponse);
    //             if(latLongResponse !== undefined && !!latLong){
    //                 var vars = latLongResponse.split(",");
    //                 var lat = parseFloat(vars[0].split(":")[1]);
    //                 var long = parseFloat(vars[1].split(":")[1]);
    //                 // $(".stuff").append("<p>Lat: " + lat + ", Long: "+ long +"</p>");
    //                 var obj = {
    //                     lat: lat,
    //                     lng: long
    //                 };
    //                 var id=  "Map" + Math.floor(Math.random()*10000);
    //                 console.log(id);
    //                 console.log(obj);
    //                 $(".stuff").append("<p class='map' id='"+id+"'></p>");
    //                 google.maps.event.addDomListener(window, "load", createMap(obj, id));
    //                 //createMap(obj,id);
    //             }

    //             var linkURL = "http://www.fourmilab.ch/cgi-bin/Yoursky?z=1&lat=" + lat + "&ns=North&lon=" + long + "&ew=West"
    //             var link = $("<a href=" + linkURL + " target=_blank class=skyLink>SEE YOUR SKY</a>")
    //             var table = $("<table class='starTable'><thead><br><th>" + 'Planet Name' + "</th><th>" + 'Constellation Name' + "</th><th>" + 'Distance (AU)' + "</th></thead><tbody></tbody></table>")
    //             var tHead = $("tHead");
    //             var tTitle = $("<h2>Planet Information</h2>");
    //             tHead.append(tTitle);
    //             table.append(tHead);
    //             // var tRow1 = $("<tr>");

    //             $(".starInfo").append(link);
    //             $(".starInfo").append(table);
                
    //             for (var i=0; i < data2.response.length; i++) {
    //                 // console.log(data2.response[i].name, data2.response[i].const, data2.response[i].au_earth);
    //                 var tBody = $("tbody");
    //                 var tRow2 = $("<tr>");
    //                 var planetNameTd = $("<td>").text(data2.response[i].name);
    //                 var constellationNameTd = $("<td>").text(data2.response[i].const);
    //                 var distance = $("<td>").text(data2.response[i].au_earth);
    //                 tRow2.append(planetNameTd, constellationNameTd, distance);
    //                 tBody.append(tRow2);
    //                 // table.append(tBody);
    //                 $(".starInfo").append(table);
    //             }
            
    //     });
    


    


   

    function createMap(obj, id){
        // create variable to store lat and long
        
        //var myLatLng = {lat: 44.4280, lng: -110.5885};
    
        // Create a map object and specify the DOM element
        // for display.
        var map = new google.maps.Map(document.getElementById(id), {
          center: obj,
          zoom: 9
        });

        // create a marker
        var marker = new google.maps.Marker({
            position: obj,
            map:map,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        console.log("working");
        // $("<#map>").append(map);
    }
    // function initMap() {
    //     //createMap();
    //     // // create variable to store lat and long
        
    //     // var myLatLng = {lat: 44.4280, lng: -110.5885};
    
    //     // // Create a map object and specify the DOM element
    //     // // for display.
    //     // var map = new google.maps.Map(document.getElementById("map"), {
    //     //   center: myLatLng,
    //     //   zoom: 9
    //     // });

    //     // // create a marker
    //     // var marker = new google.maps.Marker({
    //     //     position: myLatLng,
    //     //     map:map,
    //     //     mapTypeId: google.maps.MapTypeId.TERRAIN
    //     // });
    //     // console.log("working");
    //     // // $("<#map>").append(map);
    // }

    //CAPTURE ANSWER SELECTED BY USER AND SHOW NEXT QUESTION
    $("body").on("click", ".parkButton", function(){
        console.log(this);
        userChoice = $(this).text();
        console.log("USER CHOICE IS: " + userChoice);
        choiceObj = {
            name: $(this).attr("data-name"),
            description: $(this).attr("data-description"),
            image: $(this).attr("data-image"),
            latLong: $(this).attr("data-latLong")
        };
        
        // userAnswers.push(choiceObj);
        console.log(choiceObj);
        // console.log("Here is the users answers: " + userAnswers);
        displayInfo();
        
    });
    




    //NAVBAR BUTTONS TO SCROLL
    //==================================================

    $(".home-click").click(function() {
        $("html, body").animate({
            scrollTop: $("#top").offset().top
        }, 800);
    })

    $(".about-click").click(function() {
        $("html, body").animate({
            scrollTop: $(".about-container").offset().top
        }, 800);
    })
    $(".getstarted-click").click(function() {
        $("html, body").animate({
            scrollTop: $(".questions-container").offset().top
        }, 800);
    })});

    
