$(document).ready(function(){
    let upperKeys = ("#keyboard-upper-container");
    let lowerKeys = ("#keyboard-lower-container");
    let sentences = ["ten ate neite ate nee enet ite ate inet ent eate", "Too ato too nOt enot one totA not anot tOO aNot", "oat itain oat tain nate eate tea anne inant nean", "itant eate anot eat nato inate eat anot tain eat", "nee ene ate ite tent tiet ent ine ene ete ene ate"];
    let array = 0;
    let writing = sentences[array];
    let letterPlace = 0;
    let letter = writing.substring(letterPlace, letterPlace + 1);
    let timerOn = false;
    let startDate;
    let startTime;
    let errors = 0;
    $("#keyboard-upper-container").hide();
    //when key is pressed down
    $(document).keydown(function(e) {
      // when shift is pressed
      if (e.which === 16) {
        //uppercase is displayed
        $(upperKeys).show();
        $(lowerKeys).hide();
      }
    });
    //when shift is released
    $(document).keyup(function(e) {
      if (e.which === 16) {
        //lowercase is displayed
        $(lowerKeys).show();
        $(upperKeys).hide();
      }
    });
    $(document).keypress(function(e) {
      //highlight pressed key
      let key = $("#" + e.which);
      $(key).css("background-color", "LightSkyBlue");
      //read for keyup
      $(document).keyup(function(e) {
        //unhighlight released key
        $(key).css("background-color", "#f5f5f5");
      });
    });
    
    //current sentence and current letter
    $("#sentence").text(writing);
    $("#target-letter").text(letter);
    
    
    
      $(document).keypress(function(e) {
        if (timerOn === false) {
          startDate = new Date();
          startTime = startDate.getTime();
          timerOn = true;
        }
        //if typing the correct key
        if (e.which == sentences[array].charCodeAt(letterPlace)) {
          let correct = $('<span class="green">✓</span>');
          $(correct).appendTo("#feedback");
          //create highlight in sentence
          $("#yellow-block").css("left", "+=17.3px");
          //next letter
          letterPlace++;
          letter = writing.substring(letterPlace, letterPlace + 1);
          $("#target-letter").text(letter);
          //if sentence is complete
          if (letterPlace === writing.length) {
            array++; 
            //if all sentences are complete
            if (array === sentences.length) {
              let endDate = new Date();
              let endTime = endDate.getTime();
              let minutes = (endTime - startTime) / 60000;
              wpm = Math.round(54 / minutes - 2 * errors);
              var confirmBox = confirm(
                `You typed ${wpm} words per minute! Would you like to try again?`
              );
              if (confirmBox == true) {
                location.reload();
              }
            } else {
              //changes sentence
              writing = sentences[array];
              $("#sentence").text(writing);
              letterPlace = 0;
              letter = writing.substring(letterPlace, letterPlace + 1);
              $("#target-letter").text(letter);
              $("#yellow-block").css("left", "15px");
              $("#feedback").text("");
            }
          }
        } else {
          let wrong = $('<span class="red">x</span>');
          $(wrong).appendTo("#feedback");
          errors++;
        }
      });

});