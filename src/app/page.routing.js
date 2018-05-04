// create the module and name it WorkoutApp 

var WorkoutApp = angular.module('RoutingApp', ['ngRoute']);  

// configure our routes    
WorkoutApp.config(function($routeProvider) {  
  $routeProvider  

  // route for the View All page    
      .when('/workout', {  
      templateUrl: './workout/workout.component.html',  
      controller: 'mainController'  
  })  

  // route for the create workout page    
  .when('/create-workout', {  
      templateUrl: './create-workout/create-workout.component.html',  
      controller: 'CreateWorkoutController'  
  })  

  // route for the category page    
  .when('/category', {  
      templateUrl: './category/category.component.html',  
      controller: 'categoryController'  
  });  

});  

// create the controller and inject Angular's $scope    
WorkoutApp.controller('mainController', function($scope) {  
  // create a message to display in our view    
  $scope.HomeMessage = 'View All Controller Called !!!';  
});  

WorkoutApp.controller('CreateWorkoutController', function($scope) {  
  $scope.AboutMessage = 'Create Workout Controller Called !!!';  
});  

WorkoutApp.controller('categoryController', function($scope) {  
  $scope.ContactMessage = 'Category Controller Called !!!';  
});  