$(document).ready(function () {
    let upperKeys = ("#keyboard-upper-container");
    let lowerKeys = ("#keyboard-lower-container");
    let sentences = ["ten ate neite ate nee enet ite ate inet ent eate", "Too ato too nOt enot one totA not anot tOO aNot", "oat itain oat tain nate eate tea anne inant nean", "itant eate anot eat nato inate eat anot tain eat", "nee ene ate ite tent tiet ent ine ene ete ene ate"];
    let array = 0;
    let sentence = sentences[array];
    let letterPlace = 0;
    let letter = sentence.substring(letterPlace, letterPlace + 1);
    let timerOn = false;
    let startDate;
    let startTime;
    let errors = 0;

    //if "shift" is held down, show uppercase keyboard, hide lowercase keyboard
    $(upperKeys).hide();
    $(document).keydown(function (e) {
        if (e.which === 16) {
            $(upperKeys).show();
            $(lowerKeys).hide();
        }
    });

    //when "shift" is released, hide uppercase keyboard, show lowercase keyboard
    $(document).keyup(function (e) {
        if (e.which === 16) {
            $(lowerKeys).show();
            $(upperKeys).hide();
        }
    });

    //changes the background color of key being pressed
    $(document).keypress(function (e) {
        let key = $("#" + e.which);
        $(key).css("background-color", "LightSkyBlue");
        $(document).keyup(function (e) {
            $(key).css("background-color", "#f5f5f5");
        });
    });

    //appends current sentence and current letter text to their divs on page
    $("#sentence").text(sentence);
    $("#target-letter").text(letter);


    //start timer in background when game begins
    $(document).keypress(function (e) {
        if (timerOn === false) {
            startDate = new Date();
            startTime = startDate.getTime();
            timerOn = true;
        }
        //Correct character is keyed
        if (e.which == sentences[array].charCodeAt(letterPlace)) {
            //green check mark in feedback row
            let correct = $('<span class="green">✓</span>');
            $(correct).appendTo("#feedback");
            //increment left margin of yellow highlight block
            $("#yellow-block").css("left", "+=17.3px");
            //advance letterPlace value
            letterPlace++;
            //substring extracts only current letter
            letter = sentence.substring(letterPlace, letterPlace + 1);
            $("#target-letter").text(letter);
            //check for letterPlace vs sentence length
            if (letterPlace === sentence.length) {
                //advance to new sentence
                array++;
                //if all sentences are complete, calculate wpm, notify user of results, play again or cancel
                if (array === sentences.length) {
                    let endDate = new Date();
                    let endTime = endDate.getTime();
                    let minutes = (endTime - startTime) / 60000;
                    wpm = Math.round(54 / minutes - 2 * errors);
                    let confirmBox = confirm(
                        `You typed ${wpm} words per minute! Would you like to try again?`
                    );
                    if (confirmBox == true) {
                        location.reload();
                    } else {
                        alert("Thank you for playing!");
                    }
                //if more sentences, assign next sentence to page div, reset letter and highlight positions
                } else {
                    sentence = sentences[array];
                    $("#sentence").text(sentence);
                    letterPlace = 0;
                    letter = sentence.substring(letterPlace, letterPlace + 1);
                    $("#target-letter").text(letter);
                    $("#yellow-block").css("left", "15px");
                    $("#feedback").text("");
                }
            }
        //incorrect answer is keyed, add red "x" to feedback, add to errors count
        } else {
            let wrong = $('<span class="red">x</span>');
            $(wrong).appendTo("#feedback");
            errors++;
        }
    });

});