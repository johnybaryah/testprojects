// Its good practice to wrap your entire app in a closure
(function(){
    // this is a module called store - also known as your app name!
    var app = angular.module('store', ['store-directives']);

    // controller - this is where you'd define all the functions and values and app behavior
    app.controller('StoreController', [$http, function($http){
        // power of JS! declare properties on the fly
        var store = this;
        store.products = [];

        $http.get('/products.json').success(function(data){
            store.products = data;
        });
    }]);

    var gems = [
        {
            name: 'Citrine',
            price: 2.95,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun',
            canPurchase: true,
            outOfStock: false,
            images:[
                'images/citrine1.jpg',
                'images/citrine2.jpg'
            ],
            reviews:[
                {
                    stars: 5,
                    body: "I love it!",
                    author: "abaryah@wes.org"
                },
                {
                    stars: 1,
                    body: "piece of shit gem tbh!",
                    author: "jbaryah@wes.org"
                }
            ]
        },
        {
            name: 'Topaz',
            price: 12.65,
            description: 'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            canPurchase: true,
            outOfStock: false,
            images:[
                'images/topaz2.jpeg',
                'images/topaz1.jpeg'
            ],
            reviews:[
                {
                    stars: 5,
                    body: "I love it!",
                    author: "abaryah@wes.org"
                },
                {
                    stars: 5,
                    body: "What a gem tbh!",
                    author: "jbaryah@wes.org"
                }
            ]
        },
        {
            name: 'Sapphire',
            price: 2,
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab',
            canPurchase: true,
            outOfStock: false,
            images:[
                'images/sapphire1.png',
                'images/sapphire2.png'
            ],
            reviews:[
                {
                    stars: 5,
                    body: "I love it, omg what a beauty!",
                    author: "abaryah@wes.org"
                },
                {
                    stars: 1,
                    body: "my dog shits better gems than this one!",
                    author: "jbaryah@wes.org"
                }
            ]
        },
        {
            name: 'Diamond',
            price: 2,
            description: 'illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem',
            canPurchase: true,
            outOfStock: false,
            images:[],
            reviews:[
                {
                    stars: 1,
                    body: "barf!",
                    author: "abaryah@wes.org"
                },
                {
                    stars: 5,
                    body: "puke inducing diamond!",
                    author: "jbaryah@wes.org"
                }
            ]
        }
    ]

})();

