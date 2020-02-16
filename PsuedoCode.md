# Psuedo Code

Task #1 (setup)
User picks one character from list of available characecters. Picked character becomes player, set player attributes(health, base attack power, current attack power, counter attack power), based on chosen character. remaining characters become emenies.

    User clicks on Character Card "Html Element" to assign character object as player object (carry over attributes).

    move character card to player slot

    remove player character from list of characters

    assign remaining characters to enemy list

    move enemy character cards to enemy panel

Task #2 (combat)
User picks target from list of enemies, choosen target moves to defender area. User presses attack button to do damage to target. Enemy does counter damege to player. player damage increases by base power. repeat attack/counter process until, enemy or player is defeated. when player is defeated game over, if target is defeated, player chooses new target but retains Health.

    User clicks on choosen enemy chars to select enemy as target.

    selected enemy gets assigned as targetObject

    move enemy card to target slot

    *Combat allowed when target assigned and continues until player or enemy is defeated*

    user clicks attack button to attack target, reducing target HP by player attack power.

    target counter attack reducing player hp by counter attack power.

    player current attack power increases by base amount

    repeat combat until player or enemy health is reduced to zero.(?a)

        ?a player HP reaches zero, alert lose, increment loss counter.

        ?a enemy Hp reaches zero, alert win, increment win counter.

Task #3(reset)
All character cards moved to characters panel, with health counter reset to default. PlayerObject = empty

    empty enemy container

    empty player object

    move all character cards to selection panel

    set current attack power to base power


Misc
hover over character card to display attributes
