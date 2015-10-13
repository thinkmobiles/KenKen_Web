var kenken = kenken || {};
kenken.Game = function (puzzle, onPageLeaveMessage, showAd) {

  var pageLeaveMessageActive = false;

  function getKenKenWidget() {
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    return (isIE) ? window["KenKen"] : document["KenKen"];
  }

  function sendPuzzleToWidget() {
    getKenKenWidget().sendPuzzleData(JSON.stringify(puzzle));
    //addOnPageLeaveMessage();
  }

  function widgetAdBeforeGameCallback(data) {
    getKenKenWidget().sendWidgetAdBeforeGame(JSON.stringify(data));
  }

  function widgetAdBeforePrintCallback(data) {
    getKenKenWidget().sendWidgetAdBeforePrint(JSON.stringify(data));
  }

  function widgetAdBeforePauseCallback(data) {
    getKenKenWidget().sendWidgetAdBeforePause(JSON.stringify(data));
  }

  function widgetAdBeforeSolutionCallback(data) {
    getKenKenWidget().sendWidgetAdBeforeSolution(JSON.stringify(data));
  }

  function widgetAdOnKengratulationsCallback(data) {
    getKenKenWidget().sendWidgetAdOnKengratulations(JSON.stringify(data));
  }

  function sendSavedStateToWidget() {
    getKenKenWidget().loadPuzzleState(JSON.stringify(puzzle.state));
  }

  this.chooseAnother = function () {
    document.location.href =
        document.location.protocol + "//" +
            document.location.host +
            "/play_now";
  };

  this.getPuzzle = function () {
    sendPuzzleToWidget();
  };

  this.resetPuzzle = function () {
    sendPuzzleToWidget();

    // resetting the puzzle counts as a cheat
    $.get("/request_check", {id:puzzle.id});
  };

  /*    this.signUp = function(){
   document.location.href =
   document.location.protocol + "//" +
   document.location.host +
   "/sign_up";
   };

   function reload(){
   document.location.href = document.location.href;
   };
   */
  function removeOnPageLeaveMessage() {
    pageLeaveMessageActive = false;
    window.onbeforeunload = null;
  }

  ;

  function addOnPageLeaveMessage() {
    if (pageLeaveMessageActive)
      return;
    window.onbeforeunload = function () {
      return  onPageLeaveMessage;
    };
    pageLeaveMessageActive = true;
  }

  ;

  function solveAnotherCallback(data) {
    var response = jQuery.parseJSON(data);
    puzzle = response.puzzle;
    sendPuzzleToWidget(false);
    if (response.show_ad) {
      socialFlex.socialFlex();
    }
  }

  ;

  this.solveAnother = function () {
    window.document.location = "/game?solve_another=true";
    // $.get("/solve_another",
    //       { id: puzzle.id },
    //       solveAnotherCallback);
  };

  // Widget calls this function before the game starts. 
  this.widgetAdBeforeGame = function () {
    $.get("/game/widget_ad_before_game", null, widgetAdBeforeGameCallback);
  };

  // Widget calls this function on pause click. 
  this.widgetAdBeforePause = function () {
    $.get("/game/widget_ad_before_pause", null, widgetAdBeforePauseCallback);
  };

  // Widget calls this function on print click. 
  this.widgetAdBeforePrint = function () {
    $.get("/game/widget_ad_before_print", null, widgetAdBeforePrintCallback);
  };

  // Widget calls this function on soluton click.
  this.widgetAdBeforeSolution = function () {
    $.get("/game/widget_ad_before_solution", null, widgetAdBeforeSolutionCallback);
  };

  // Widget calls this function on soluton click.
  this.widgetAdOnKengratulations = function () {
    $.get("/game/widget_ad_on_kengratulations", null, widgetAdOnKengratulationsCallback);
  };

  // this.activateFullFeatured = function(){
  // $.get("/activate_full_featured",
  // { id: puzzle.id, state: puzzle.state },
  // solveAnotherCallback);
  // };

  this.puzzleSolved = function () {    
  };

  this.autoSave = function (state) {
    $.post("/save_state", {id:puzzle.id, state:state, autosave:1});
    puzzle.state = state;
  };

  this.saveState = function (state) {
    // saving counts as a cheat
    $.get("/request_check", {id:puzzle.id});

    $.post("/save_state", {id:puzzle.id, state:state}, function(data, textStatus, jqXHR){
      if (data == "ok"){
        $("#save-ok").fadeIn(150).delay(5000).fadeOut(150);
      }
    });
    puzzle.state = state;
  };

  this.readState = function (id) {
    $.get("/read_state", {id:puzzle.id},
        function (state) {
          puzzle.state = state;
          sendSavedStateToWidget();
        });
  };


  function showAdCallback(data) {
    var response = jQuery.parseJSON(data);
    if (response) {
      socialFlex.socialFlex();
      _gaq.push(['_trackEvent', 'MediaBrix', 'GamePage', 'CallVideoAd', 1 , true]);
    }
  };

  this.callMbrix = function () {
    socialFlex.socialFlex();
    _gaq.push(['_trackEvent', 'MediaBrix', 'GamePage', 'CallVideoAd', 1 , true]);
  };

  this.onReveal = function () {
    $.get("/request_reveal", {id:puzzle.id});
  };

  this.onCheck = function () {
    $.get("/request_check", {id:puzzle.id});
  };

  this.onPrint = function () {
    //alert('onPrint');
    $.get("/show_ad_on_print", {}, showAdCallback);

    // printing counts as a cheat as well
    $.get("/request_check", {id:puzzle.id});
  };

  this.onPause = function () {
    //alert('onPause');
    $.get("/show_ad_on_pause", {}, showAdCallback);

    // pausing counts as a cheat as well
    $.get("/request_check", {id:puzzle.id});
  };

  this.onSolution = function () {
    //alert('onSolution');
    $.get("/show_ad_on_solution", {}, showAdCallback);

    // asking for the solution counts as a cheat
    $.get("/request_check", {id:puzzle.id});
  };

  // Called at the moment the game starts
  this.puzzleStarted = function () {
    $.get("/puzzle_started", {id:puzzle.id});
  };

  // Called at the moment the game is reset
  this.puzzleReset = function () {
    $.get("/puzzle_started", {id:puzzle.id, reset:true});
  };

  // Time received in HH:MM:SS format
  this.puzzleFinished = function (strTime) {
    $.get("/puzzle_finished", {id:puzzle.id, time:strTime});
    puzzle.solved = true;
    removeOnPageLeaveMessage();
  };

  function waitForFlash() {
    if (((typeof  getKenKenWidget().sendPuzzleData) == "function") && ((typeof  getKenKenWidget().sendWidgetAdBeforeGame) == "function")){
      sendPuzzleToWidget();
    } else {
      setTimeout(waitForFlash, 100);
    }
  };

  function waitForFlashAndMBrix() {
    if ((typeof  getKenKenWidget().sendPuzzleData == "function") && (typeof  socialFlex.socialFlex == "function")) {
      sendPuzzleToWidget();
    } else {
      setTimeout(waitForFlashAndMBrix, 100);
    }
  };

 setTimeout(waitForFlash, 500);
//  waitForFlash();
};