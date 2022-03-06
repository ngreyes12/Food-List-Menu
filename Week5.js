class Food{
    constructor(name, category){
        this.name = name;
        this.type = category;
    }
    
    describe() {
        return `${this.name} is a ${this.category}.`;
    }
}

class FoodList {
    constructor(name) {
        this.name = name;
        this.category = [];
    }

    addFood(food) {
        if (food instanceof Food) {
            this.food.push(food);
        } else {
            throw new Error(`You can only add an instance of a Food. Argument is not a food: ${food}`);
        }
    }

    describe() {
        return `${this.name} has ${this.foods.length} foods.`;
    }
}

class Menu {
    constructor() {
        this.foodLists = [];
        this.selectedFoodList = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createFoodList();
                    break;
                case '2':
                    this.viewFoodList();
                    break;
                case '3':
                    this.deleteFoodList();
                    break;
                case '4':
                    this.displayFoodLists();
                    break;
                default:
                    selection = 0;
            }
        
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new food list
            2) view food list
            3) delete food list
            4) display all food lists
        `);
    }

    showFoodListMenuOptions(foodListInfo) {
        return prompt(`
            0) back
            1) create food item
            2) delete food item
            -------------------------
            ${foodListInfo}
        `);
    }
    
    displayFoodLists() {
        let foodListString = '';
        for (let i = 0; i < this.foodLists.length; i++) {
            foodListString += i + ') ' + this.foodLists[i].name + '\n';
        }
        alert(foodListString);
    }

     createFoodList() {
         let name = prompt('Enter name for new food list:');
        this.foodLists.push(new FoodList(name));
    }

    viewFoodList() {
        let index = prompt('Enter the index of the food list you wish to view:');
        if (index > -1 && index < this.foodLists.length) {
            this.selectedFoodList = this.foodLists[index];
            let description = 'Food List Name: ' + this.selectedFoodList.name + '\n';

            for (let i = 0; i < this.selectedFoodList.foods.length; i++) {
                description += i + ') ' + this.selectedFoodList.foods[i].name 
                + ' - ' + this.selectedFoodList.foods[i].category + '\n';
            }
        

            let selection = this.showFoodListMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createFood();
                    break;
                case '2':
                    this.deleteFood();
            }
        }
    } 


    deleteFoodList() {
        let index = prompt('Enter the index of the food list you wish to delete:');
        if (index > -1 && index < this.foodLists.length)
            this.foodLists.splice(index, 1);
    }

    createFood() {
        let name = prompt('Enter name for new food item:');
        let category = prompt('Enter type for new food item:');
        this.selectedFoodList.foods.push(new Food(name, category));
    }

    deleteFood() {
        let index = prompt('Enter the index of the food item you wish to delete:');
        if (index > -1 && index < this.selectedFoodList.foods.length) {
            this.selectedFoodList.foods.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();