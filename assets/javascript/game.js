//Html Elements

var charSelectionPanel;
var playerCharSlot;
var playerHPDisplay;
var enemySelectionPanel;
var enemyHPDisplay;
var targetCharSlot;
var attackButton;

//Global Variables

var gameState = 0; //0 = Setup,  1 = Player Selection, 2= Enemy Selection, 3 = Combat

var winCounter;
var lossCounter;

var playerObj;
var targetObj;

var characterContainer = [];
var enemyContainer = [];

//Instructions
var gameInstructions;

//Character Object Base

function CharacterObject(_name, _hp, _atkPwr, _cntrPwr, _imgPath) {
  ////Variables

  //Character Attributes
  this.name = _name;
  this.atkPwr = _atkPwr;
  this.cntrPwr = _cntrPwr;
  this.hp = _hp;
  this.currentHp = 0;
  this.currentAtkPwr = 0;
  this.imgPath = _imgPath;
  this.eliminated = false;

  //HTML Elements
  this.characterPanel;
  this.hpDisplay;
  this.popUpInfo;

  //Test
  this.idString;

  ////Methods

  //Set up character
  this.setUp = function() {
    this.currentHp = this.hp;
    this.currentAtkPwr = this.atkPwr;

    //recreate ID tag for health display and store ref
    var temp = "#" + this.name + "health";
    this.hpDisplay = $(temp);
  };

  //increase Attack Power
  this.increaseAtkPwr = function() {
    this.currentAtkPwr += this.atkPwr;
  };

  //Recieve Damage
  this.rcvDamage = function(_atk) {
    this.currentHp -= _atk;
  };

  //Combat
  this.combat = function(_trgtChar) {
    var dmg = this.currentAtkPwr;
    _trgtChar.rcvDamage(dmg);
    this.currentHp -= _trgtChar.cntrPwr * 2;
    this.increaseAtkPwr();
  };

  //Reset
  this.reset = function() {
    this.currentHp = this.hp;
    this.currentAtkPwr = this.atkPwr;
  };

  //Update display
  this.updateDisplay = function() {
    this.hpDisplay.text(this.currentHp);
  };

  this.createPanel = function() {
    var other = this.name;
    var path = this.imgPath;

    this.characterPanel = $("<div></div>");
    this.characterPanel.attr("id", other);
    this.characterPanel.attr("class", "col-2 characterCard");
    this.characterPanel.append(
      "<div class = 'card border-0 bg-transparent'> <img class= 'portrait' src= " +
        path +
        " class = 'card-img'/> <div class='card-img-overlay'>  <div class='row' > <div class='col'> <p class= ' text-center portraitText' id=" +
        other +
        "nameDisplay>" +
        other +
        "</p></div></div>  <div class='row '> <div class='col'> <p class= 'portraitText text-center' id='" +
        other +
        "health'>" +
        this.hp +
        " </p></div></div>  </div> </div>"
    );
  };
}

//Create all Unique Character Objects
var darthMaulObj = new CharacterObject(
  "Darth_Maul",
  120,
  20,
  15,
  "../unit-4-game/assets/images/darthmaul.png"
);

var lukeSkywalkerObj = new CharacterObject(
  "Luke_Skywalker",
  190,
  30,
  10,
  "../unit-4-game/assets/images/lukekywalker.png"
);

var darthVaderObj = new CharacterObject(
  "Darth_Vader",
  150,
  25,
  25,
  "../unit-4-game/assets/images/darthvader.png"
);

var yodaObj = new CharacterObject(
  "Yoda",
  135,
  40,
  10,
  "../unit-4-game/assets/images/yoda.png"
);

//Store Characters in container
var characterContainer = [
  darthMaulObj,
  darthVaderObj,
  lukeSkywalkerObj,
  yodaObj
];

var setGame = function() {
  //Create all character cards and append to selection panel
  //For each character object in character container, create a element in the panel

  if (gameState === 0) {
    for (i = 0; i < characterContainer.length; i++) {
      characterContainer[i].createPanel();
    }
  }

  for (i = 0; i < characterContainer.length; i++) {
    $("#charSelectionPanel").append(characterContainer[i].characterPanel);
  }

  //Set Game State to Player Selection
  gameState = 1;
};

//Method that happens when user clicks on any character image
var clickAction = function(_state, _obj) {
  //Player Selection.
  if (_state === 1) {
    //Assign Obj as Player
    playerObj = _obj;
    playerObj.setUp();
    playerObj.eliminated = true;
    console.log("Player chooses " + playerObj.name + " as thier Character");

    //Move card to Player panel
    $("#selectedPlayerCard").append(_obj.characterPanel);

    //Move other Cards to Enemies Panel
    for (i = 0; i < characterContainer.length; i++) {
      if (characterContainer[i].name != _obj.name) {
        $("#enemySelectionPanel").append(characterContainer[i].characterPanel);
      }
    }

    //Change State to 2
    gameState = 2;
  } else if (_state === 2) {
    //check if already assigned as player...
    if (_obj.name === playerObj.name) {
      alert(
        playerObj.name +
          " already Selected as Player, Select another character as your Enemy"
      );
      return;
    }
    //Character not assigned
    else {
      //Assign Obj as Target
      targetObj = _obj;
      targetObj.setUp();
      console.log("Player chooses " + targetObj.name + " as thier Enemy");

      //Move Card to Target Panel
      $("#targetPanel").append(_obj.characterPanel);

      //Change state to 3
      gameState = 3;
    }
  } else {
    console.log("State  0 or 3");
    return;
  }
};

var combatAction = function() {
  //Check if in combat State
  if (gameState === 3) {
    console.log("In Combat ");
    console.log(
      playerObj.name +
        "with Health of " +
        playerObj.currentHp +
        " Vs " +
        targetObj.name +
        "with Health of " +
        targetObj.currentHp
    );
    //Player attacks target, deals damage and recieves counter damage.
    playerObj.combat(targetObj);
    playerObj.updateDisplay();
    targetObj.updateDisplay();
    //update display of HP

    //check HP of player and Target if player is zero game over, if enemy is choose new enemy
    if (targetObj.currentHp <= 0) {
      alert("Enemy Eliminated choose new target");
      targetObj.eliminated = true;
      gameState = 2;
      //Add way to check if all enemies eliminated
    } else if (playerObj.currentHp <= 0) {
      alert("Player Eliminated, Game Over");
      gameState = 1;
      setGame();
    }
  }
  //If not in combat state return
  else {
    console.log("Not in Combat");
    return;
  }
};

var debug = function() {
  ////////
};

$(document).ready(function() {
  setGame();

  //Test

  //Character Buttons
  darthVaderObj.characterPanel.on("click", function() {
    clickAction(gameState, darthVaderObj);
  });
  darthMaulObj.characterPanel.on("click", function() {
    clickAction(gameState, darthMaulObj);
  });
  yodaObj.characterPanel.on("click", function() {
    clickAction(gameState, yodaObj);
  });
  lukeSkywalkerObj.characterPanel.on("click", function() {
    clickAction(gameState, lukeSkywalkerObj);
  });

  //Attack Button
  $("#attackButton").on("click", combatAction);
});
