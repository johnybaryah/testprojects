(function(){
    var app = angular.module('store-directives', []);

    app.directive('productTitle', function(){
        return {
            restrict: 'E', // E = element
            templateUrl: 'product-info.html'
        };
    });

    app.directive('productDesc', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-desc.html'
        };
    });

    app.directive('productReviews', function(){
        return { 
            restrict: 'E', 
            templateUrl: 'product-reviews.html',
            controller: function(){
                this.review = {};
                
                this.addReview = function(product){
                    // passing the current instance of product 
                    // and then adding the review object to the array of reviews
                    product.reviews.push(this.review);
        
                    // after the review has been attached to the array
                    // we reset the review so our form clears up!!!
                    this.review = {};
                }
            },
            controllerAs: 'reviewCtrl'
        };
    });

    app.directive('productSpecs', function(){
        return { 
            restrict: 'A', 
            templateUrl: 'product-specs.html'
        };
    });

    app.directive('productGallery', function(){
        return{
            restrict: 'E',
            templateUrl: 'product-gallery.html',
            controller: function(){
                this.current = 0;
                
                this.setCurrent = function(val){
                    this.current = val || 0;
                };
            },
            controllerAs: 'gallery'
        };
    });

    app.directive('productPanel', function(){
        return {
            restrict: 'E',
            templateUrl : 'product-panel.html',
            controller: function(){
                this.tab = 1;
                
                this.selectTab = function(val){
                    this.tab = val;
                }
        
                this.isSelected = function(tab){
                    return this.tab === tab;
                }
            },
            controllerAs: 'panel'
        };
    });
})();