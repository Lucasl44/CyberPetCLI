const inquirer = require("inquirer");
let ui = new inquirer.ui.BottomBar();
const chalk = require("chalk");
const questions = [
    {
        type: "rawlist",
        name: "species",
        message: chalk.yellow("What kind of animal would you like to raise?"),
        choices: ["Cat", "Dog", "Rabbit"]
    },
    {
        type: "input",
        name: "animalName",
        message: chalk.yellow("What is the name of your pet?")
    }
]
const questions2 = [
    {
        type: "rawlist",
        name: "health",
        message: chalk.yellow("What would you like to do?"),
        choices: ["Feed", "Give Water", "Play"]
    }
]

let theAnimal = "";
let deathStatus = false;

const gameLoop = () => {
    ui.log.write(chalk.green(`Species: ${theAnimal.species} | Name: ${theAnimal.name.toUpperCase()} | Hunger: ${theAnimal.hunger} | Thirst: ${theAnimal.thirst} | Boredom: ${theAnimal.boredom}`));
    healthD();
    if (
        theAnimal.hunger == 0 ||
        theAnimal.thirst == 0 ||
        theAnimal.boredom == 0
    ) {
        deathStatus = true;
        console.log(chalk.red(`${theAnimal.name.toUpperCase()} died :(`));
        return;
    }

    inquirer.prompt(questions2)
        .then((answers) => {
            if (answers.health == "Feed") {
                hungerUp();
            } else if (answers.health == "Give Water") {
                thirstUp();
            } else {
                boredomUp();
            }
        })
        .then(() => gameLoop())
        .catch((err) => { console.log(err) })

}

inquirer.prompt(questions)
    .then((answers) => {
        theAnimal = new Health(answers.species, answers.animalName);
    })
    .then(() => gameLoop())
    .catch((err) => { console.log(err) })

const healthD = () => {
    theAnimal.hungerDown();
    theAnimal.thirstDown();
    theAnimal.boredomDown();
}
const hungerUp = () => {
    theAnimal.hungerUp();
};

const thirstUp = () => {
    theAnimal.thirstUp();
};

const boredomUp = () => {
    theAnimal.boredomUp();
};

class Animal {
    constructor(species, name) {
        this._species = species;
        this._name = name;
    }
    get species () {
        return this._species;
    }
    get name () {
        return this._name;
    }
}

class Health extends Animal {
    constructor(species, name) {
        super(species, name)
        this._hunger = 5;
        this._thirst = 5;
        this._boredom = 5; 
    }
    get hunger () {
        return this._hunger;
    }
    get thirst () {
        return this._thirst;
    }
    get boredom () {
        return this._boredom;
    }
    hungerUp() {
        this._hunger++;
    }
    hungerDown() {
        this._hunger--;
    }
    thirstUp() {
        this._thirst++;
    }
    thirstDown() {
        this._thirst--;
    }
    boredomUp() {
        this._boredom++;
    }
    boredomDown() {
        this._boredom--;
    }
}
