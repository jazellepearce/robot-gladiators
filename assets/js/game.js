var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // check if input values are empty stings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;



  }
  formEl.reset();

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

     //create edit button
     var editButtonEl = document.createElement("button");
     editButtonEl.textContent = "Edit";
     editButtonEl.className = "btn edit-btn";
     editButtonEl.setAttribute("data-task-id", taskId);
 
     actionContainerEl.appendChild(editButtonEl);
 
     //create delete button
     var deleteButtonEl = document.createElement("button");
     deleteButtonEl.textContent = "Delete";
     deleteButtonEl.className = "btn delete-btn";
     deleteButtonEl.setAttribute("data-task-id", taskId);
 
     actionContainerEl.appendChild(deleteButtonEl);

     var statusSelectEl = document.createElement("select");
     statusSelectEl.className = "select-status";
     statusSelectEl.setAttribute("name", "status-change");
     statusSelectEl.setAttribute("data-task-id", taskId);

     actionContainerEl.appendChild(statusSelectEl);

     var statusChoices = ["To Do", "In Progress", "Completed"];

     for (var i = 0; i < statusChoices.length; i++) {
       // create option element
       var statusOptionEl = document.createElement("option");
       statusOptionEl = document.createElement("option");
       statusOptionEl.textContent = statusChoices[i];
       statusOptionEl.textContent("value", statusChoices[i]);
       statusOptionEl.setAttribute("value", statusChoices[i]);

       // append to select
       statusSelectEl.appendChild(statusOptionEl);
     }

     return actionContainerEl;

  };
};
var createTaskEl = function(taskDataObj) {
  // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

//add tawsk id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" +  taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);

// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

// increase task counter or next uniqoue id
taskIdCounter++;
}

formEl.addEventListener("submit", taskFormHandler);

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };
  
  // fight function (now with parameter for enemy's object holding name, health, and attack values)
  var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerInfo.money for skipping
          playerInfo.money = Math.max(0, playerInfo.money - 10);
          console.log("playerInfo.money", playerInfo.money)
          break;
        }
      }
  
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemy.attack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
  };
  
  // function to start a new game
  var startGame = function() {
    // reset player stats
    playerInfo.reset();
  
    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
      // if player is still alive, keep fight next enemy
      if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
        debugger;
  
        // pick new enemy to fight based on the index of the enemyInfo array
        var pickedEnemyObj = enemyInfo[i];
  
        // set health for picked enemy
        pickedEnemyObj.health = randomNumber(40, 60);
  
        // pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
        fight(pickedEnemyObj);
  
        // if player is still alive and we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
          var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        
          // if yes, take them to the store() function
          if (storeConfirm) {
            shop();
          }
        }
      }
      // if player is not alive, break out of the loop and let endGame function run
      else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    }
  
    // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
    endGame();
  };
  
  // function to end the entire game
  var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
      window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
    } else {
      window.alert("You've lost your robot in battle!");
    }
  
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm('Would you like to play again?');
  
    if (playAgainConfirm) {
      startGame();
    } else {
      window.alert('Thank you for playing Robot Gladiators! Come back soon!');
    }
  };
  
  // go to shop between battles function
  var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
    );
  
    // use switch case to carry out action
    switch (shopOptionPrompt) {
      case 'REFILL':
      case 'refill':
        playerInfo.refillHealth();
        break;
      case 'UPGRADE':
      case 'upgrade':
        playerInfo.upgradeAttack();
        break;
      case 'LEAVE':
      case 'leave':
        window.alert('Leaving the store.');
  
        // do nothing, so function will end
        break;
      default:
        window.alert('You did not pick a valid option. Try again.');
  
        // call shop() again to force player to pick a valid option
        shop();
        break;
    }
  };
  
  /* END GAME FUNCTIONS */
  
  /* GAME INFORMATION / VARIABLES */
  
  // player information
  var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    },
    refillHealth: function() {
      if (this.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
      } 
      else {
        window.alert("You don't have enough money!");
      }
    },
    upgradeAttack: function() {
      if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
      } 
      else {
        window.alert("You don't have enough money!");
      }
    }
  };
  
  // enemy information
  var enemyInfo = [
    {
      name: 'Roborto',
      attack: randomNumber(10, 14)
    },
    {
      name: 'Amy Android',
      attack: randomNumber(10, 14)
    },
    {
      name: 'Robo Trumble',
      attack: randomNumber(10, 14)
    }
  ];
  
  console.log(enemyInfo);
  console.log(enemyInfo[0]);
  console.log(enemyInfo[0].name);
  console.log(enemyInfo[0]['attack']);

  var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    }

    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

  var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  }

  var editTask = function(taskId) {



    // get task list item element

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;


    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
  }
  
  pageContentEl.addEventListener("click", taskButtonHandler);
  
  /* END GAME INFORMATION / VARIABLES */
  
  /* RUN GAME */
  startGame();
  
