export default class Items {
    private static _baseFolder: String = './assets/';

    static ingredients = {
        Flour:           { translation: 'Мука',       ref: require(Items._baseFolder + 'flour.png')     },
        Eggs:            { translation: 'Яица',       ref: require(Items._baseFolder + 'eggs.png')      },
        Oil:             { translation: 'Масло',      ref: require(Items._baseFolder + 'oil.png')       },
        Salad:           { translation: 'Салат',      ref: require(Items._baseFolder + 'salad.png')     },
        Tomatos:         { translation: 'Помидоры',   ref: require(Items._baseFolder + 'tomatos.png')   },
        Cucumbers:       { translation: 'Огурцы',     ref: require(Items._baseFolder + 'cucumbers.png') },
        Olives:          { translation: 'Оливки',     ref: require(Items._baseFolder + 'olives.png')    },
        Sausage:         { translation: 'Колбаса',    ref: require(Items._baseFolder + 'sausage.png')   },
        Noodles:         { translation: 'Лапша',      ref: require(Items._baseFolder + 'noodles.png')   },
        Salt:            { translation: 'Соль',       ref: require(Items._baseFolder + 'salt.png')      },
        Papper:          { translation: 'Перец',      ref: require(Items._baseFolder + 'papper.png')    },
        Milk:            { translation: 'Молоко',     ref: require(Items._baseFolder + 'milk.png')      },
        Apple:           { translation: 'Яблоки',     ref: require(Items._baseFolder + 'apple.png')     },

        Grapes:          { translation: 'Виноград',   ref: require(Items._baseFolder + 'grapes.png')    },
        Yeast:           { translation: 'Дрожжи',     ref: require(Items._baseFolder + 'flour.png')     },
        Raspberry:       { translation: 'Малина',     ref: require(Items._baseFolder + 'raspberry.png') },
        Sugar:           { translation: 'Сахар',      ref: require(Items._baseFolder + 'sugar.png')     }
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
        TShirt:         { translation: 'Футболка', ref: require(Items._baseFolder + 'tshort.png'),  },
        Dress:          { translation: 'Платье'  , ref: require(Items._baseFolder + 'dress.png'),   },
        Knickerbockers: { translation: 'Бриджи'  , ref: require(Items._baseFolder + 'knicker.png'), },
        Boots:          { translation: 'Сапоги'  , ref: require(Items._baseFolder + 'boots.png'),   },
        Panama:         { translation: 'Шляпа'   , ref: require(Items._baseFolder + 'panama.png'),  }
    };
}
