export default class Items {
    static baseFolder: String = './assets/';

    static ingredients = {
        Flour:           { translation: 'Мука',       ref: require('./assets/eat/flour.png')     },
        Eggs:            { translation: 'Яица',       ref: require('./assets/eat/eggs.png')      },
        Oil:             { translation: 'Масло',      ref: require('./assets/eat/oil.png')       },
        Salad:           { translation: 'Салат',      ref: require('./assets/eat/salad.png')     },
        Tomatos:         { translation: 'Помидоры',   ref: require('./assets/eat/tomatos.png')   },
        Cucumbers:       { translation: 'Огурцы',     ref: require('./assets/eat/cucumber.png') },
        Olives:          { translation: 'Оливки',     ref: require('./assets/eat/olives.png')    },
        Sausage:         { translation: 'Колбаса',    ref: require('./assets/eat/sasauge.png')   },
        Noodles:         { translation: 'Лапша',      ref: require('./assets/eat/noodles.png')   },
        Salt:            { translation: 'Соль',       ref: require('./assets/eat/salt.png')      },
        Papper:          { translation: 'Перец',      ref: require('./assets/eat/papper.png')    },
        Milk:            { translation: 'Молоко',     ref: require('./assets/eat/milk.png')      },
        Apple:           { translation: 'Яблоки',     ref: require('./assets/eat/apple.png')     },

        Grapes:          { translation: 'Виноград',   ref: require('./assets/eat/grapes.png')    },
        Yeast:           { translation: 'Дрожжи',     ref: require('./assets/eat/flour.png')     },
        Raspberry:       { translation: 'Малина',     ref: require('./assets/eat/raspberry.png') },
        Sugar:           { translation: 'Сахар',      ref: require('./assets/eat/sugar.png')     }
    };

    static recipes = {
        ApplePie:  { ingredients: [ 
            Items.ingredients.Eggs, Items.ingredients.Oil, Items.ingredients.Flour, 
            Items.ingredients.Milk, Items.ingredients.Apple], 
            translation: 'Яблочный пирог', chance: 0.14, 
        },
        Hamburger: { ingredients: [ 
            Items.ingredients.Salad, Items.ingredients.Tomatos, 
            Items.ingredients.Flour, Items.ingredients.Milk
         ], 
            translation: 'Гамбургер', chance: 0.14, 
        },
        Pizza: { ingredients: [ 
            Items.ingredients.Flour, Items.ingredients.Milk, Items.ingredients.Tomatos, 
            Items.ingredients.Sausage, Items.ingredients.Olives
         ], 
            translation: 'Пицца', chance: 0.14, 
        },
        Omelete: { ingredients: [ 
            Items.ingredients.Eggs, Items.ingredients.Milk, Items.ingredients.Tomatos,
            Items.ingredients.Salt
         ], 
            translation: 'Яишница', chance: 0.14, 
        },
        Casserole: { ingredients: [ 
            Items.ingredients.Eggs, Items.ingredients.Milk, 
            Items.ingredients.Sugar
         ], 
            translation: 'Запеканка', chance: 0.14, 
        },
        Hooch: { ingredients: [ 
            Items.ingredients.Grapes, Items.ingredients.Yeast, 
            Items.ingredients.Sugar, Items.ingredients.Raspberry
         ], 
            translation: 'Самогон', chance: 0.05, 
        }
    };

    static clothes = {
        TShirt:         { translation: 'Футболка', ref: require('./assets/clothes/tshort.png'),  },
        Dress:          { translation: 'Платье'  , ref: require('./assets/clothes/dress.png'),   },
        Knickerbockers: { translation: 'Бриджи'  , ref: require('./assets/clothes/knicker.png'), },
        Boots:          { translation: 'Сапоги'  , ref: require('./assets/clothes/boots.png'),   },
        Panama:         { translation: 'Шляпа'   , ref: require('./assets/clothes/panama.png'),  }
    };
}
