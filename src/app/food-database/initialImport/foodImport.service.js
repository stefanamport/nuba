"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var foodInitialData_1 = require("./foodInitialData");
var FirebaseImportService = (function () {
    function FirebaseImportService(af) {
        this.af = af;
        console.log(af);
    }
    /*
     * Imports the data in foodInitialData.ts to the firebase:
     * - food: contains basic food information
     * - foodDetails: contains detail information about food
     */
    FirebaseImportService.prototype.importToFirebase = function () {
        var allFood = foodInitialData_1.FoodInitialData;
        for (var _i = 0, allFood_1 = allFood; _i < allFood_1.length; _i++) {
            var food = allFood_1[_i];
            var key = food.id;
            createFood(food, this.af);
            createFoodDetails(food, this.af);
        }
    };
    return FirebaseImportService;
}());
FirebaseImportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], FirebaseImportService);
exports.FirebaseImportService = FirebaseImportService;
/*
 * Save food to the node 'food' in the firebase database
 */
function createFood(food, af) {
    console.log(af);
    var toSaveFood = af.database.object('food/' + food.id);
    toSaveFood.set({
        "name": food.name,
        "synonyms": food.synonyms,
        "category": food.category,
        "matrix_unit": food.matrix_unit,
        "matrix_amount": food.matrix_amount
    });
}
/*
 * Save food details to the node 'foodDetails' in the firebase database
 */
function createFoodDetails(food, af) {
    var toSaveFoodDetails = af.database.object('foodDetails/' + food.id);
    delete food.id;
    toSaveFoodDetails.set(food);
}
//# sourceMappingURL=foodImport.service.js.map