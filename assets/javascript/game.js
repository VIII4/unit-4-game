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
var enemyContainer =[];

//Character Object Base

function CharacterObject(_hp, _atkPwr, _cntrPwr, ){
	
	////Variables
	
	
	//Character Attributes
	this.atkPwr = _atkPwr;
	this.cntrPwr = _cntrPwr;
	this.hp = _hp;
	this.currentHp =0;
	this.currentAtkPwr = 0;
	
	//HTML Elements
	this.hpDisplay;
	this.popUpInfo;
	
	////Methods
	
	//Set up character
	this.setUp = function(){
		this.currentHp = this.hp
		this.currentAtkPwr = this.atkPwr
	}
	
	//increase Attack Power
	this.increaseAtkPwr = function(){
		this.currentAtkPwr +-= this.atkPwr;
	}
	
	//Recieve Damage
	this.rcvDamage = function(_atk){
		this.currentHp -= _atk;
	}
	
	
	//Combat
	this.combat = function(_trgtChar){ 
		_trgtChar.rcvDamage(atkPwr)
		this.hp -= _trgtChar.cntrPwr;
		this.increaseAtkPwr();
	}
	
	//Reset
	this.reset = function(){
		this.currentHp = this.hp
		this.currentAtkPwr = this.atkPwr
    }
    
    //Update display
    this.updateDisplay = function()
    {
        // this.hpDisplay.html()
	    // this.popUpInfo;
    }

	
}


