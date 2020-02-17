//Html Elements

var charSelectionPanel;
var playerCharSlot;
var playerHPDisplay;
var enemySelectionPanel;
var enemyHPDisplay;
var targetCharSlot;
var attackButton;

//Global Variables

var winCounter;
var lossCounter;

var playerObj;
var targetObj;

var characterContainer = [];
var enemyContainer = [];

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

  //HTML Elements
  this.characterPanel;
  this.hpDisplay;
  this.popUpInfo;

  ////Methods

  //Set up character
  this.setUp = function() {
    this.currentHp = this.hp;
    this.currentAtkPwr = this.atkPwr;
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
    _trgtChar.rcvDamage(atkPwr);
    this.hp -= _trgtChar.cntrPwr;
    this.increaseAtkPwr();
  };

  //Reset
  this.reset = function() {
    this.currentHp = this.hp;
    this.currentAtkPwr = this.atkPwr;
  };

  //Update display
  this.updateDisplay = function() {
    // this.hpDisplay;
    // this.popUpInfo;
  };

  this.createPanel = function() {
    var other = this.name;
    var path = this.imgPath;

    this.characterPanel = $("<div></div>");
    this.characterPanel.attr("id", other);
    this.characterPanel.attr("class", "col");
    this.characterPanel.append(
      "<div class = 'card border-0 bg-transparent'> <img src= " +
        path +
        " class = 'card-img'/> <div class='card-img-overlay'>  <div class='row > <div class='col'> <p id= " +
        other +
        "'nameDisplay'></p></div>// </div>  <div class='row > <div class='col'> <p id= " +
        other +
        "'health'></p></div> //  </div>  </div> </div>"
    );
  };
}

//Create all Unique Character Objects
var darthMaulObj = new CharacterObject(
  "darthMaul",
  120,
  20,
  15,
  "../assets/images/darthmaul.png"
);

var debug = function() {
  console.log(darthMaulObj.atkPwr, darthMaulObj.name, darthMaulObj.hp);
};

var setGame = function() {
  //Create all character cards and append to selection panel
  //For each character object in character container, create a element in the panel
  darthMaulObj.createPanel();
  $("#charSelectionPanel").append(darthMaulObj.characterPanel);
};

$(document).ready(function() {
  setGame();
  /////////
});
