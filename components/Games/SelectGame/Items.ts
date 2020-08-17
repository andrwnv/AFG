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

        Grapes:          { translation: 'Виноград',   ref: require(Items._baseFolder + 'grapes.png')    },
        Yeast:           { translation: 'Дрожжи',     ref: require(Items._baseFolder + 'flour.png')     },
        Raspberry:       { translation: 'Малина',     ref: require(Items._baseFolder + 'raspberry.png') },
        Sugar:           { translation: 'Сахар',      ref: require(Items._baseFolder + 'sugar.png')     }
    };

    static recipes = {
        ApplePie:  { ingredients: {  }, translation: 'Яблочный пирог', chance: 0.14, },
        Hamburger: { ingredients: {  }, translation: 'Гамбургер'     , chance: 0.14, },
        Pizza:     { ingredients: {  }, translation: 'Пицца'         , chance: 0.14, },
        Ramen:     { ingredients: {  }, translation: 'Рамэн'         , chance: 0.14, },
        Omelete:   { ingredients: {  }, translation: 'Яишница'       , chance: 0.14, },
        Casserole: { ingredients: {  }, translation: 'Запеканка'     , chance: 0.14, },
        Hooch:     { ingredients: {  }, translation: 'Самогон'       , chance: 0.05, }
    };

    static clothes = {
        TShirt:         { translation: 'Футболка', ref: require(Items._baseFolder + 'tshort.png'),  },
        Dress:          { translation: 'Платье'  , ref: require(Items._baseFolder + 'dress.png'),   },
        Knickerbockers: { translation: 'Бриджи'  , ref: require(Items._baseFolder + 'knicker.png'), },
        Boots:          { translation: 'Сапоги'  , ref: require(Items._baseFolder + 'boots.png'),   },
        Panama:         { translation: 'Шляпа'   , ref: require(Items._baseFolder + 'panama.png'),  }
    };
}
