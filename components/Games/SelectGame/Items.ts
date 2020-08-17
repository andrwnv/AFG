export default class Items {
    static ingredients = {
        Flour:           'Мука',
        Eggs:            'Яица',
        Oil:             'Масло',
        Salad:           'Салат',
        Tomatos:         'Помидоры',
        Cucumbers:       'Огурцы',
        Olives:          'Оливки',
        Sausage:         'Колбаса',
        Noodles:         'Лапша',
        Salt:            'Соль',
        Papper:          'Перец',
        ChickenBouillon: 'Куринный бульон',
        Milk:            'Молоко',

        Grapes:          'Виноград',
        Yeast:           'Дрожжи',
        Raspberry:       'Малина', 
        Sugar:           'Сахар'
    };

    static recipes = {
        ApplePie:  { ingredients: {  }, translation: 'Яблочный пирог', chance: 0.14 },
        Hamburger: { ingredients: {  }, translation: 'Гамбургер'     , chance: 0.14 },
        Pizza:     { ingredients: {  }, translation: 'Пицца'         , chance: 0.14 },
        Ramen:     { ingredients: {  }, translation: 'Рамэн'         , chance: 0.14 },
        Omelete:   { ingredients: {  }, translation: 'Яишница'       , chance: 0.14 },
        Casserole: { ingredients: {  }, translation: 'Запеканка'     , chance: 0.14 },
        Hooch:     { ingredients: {  }, translation: 'Самогон'       , chance: 0.05 }
    };

    static clothes = {
        TShirt:         { translation: 'Футболка', },
        Dress:          { translation: 'Платье',   },
        Sweater:        { translation: 'Кофта',    },
        Knickerbockers: { translation: 'Бриджи',   },
        Boots:          { translation: 'Сапоги',   },
        Sandals:        { translation: 'Сандали',  },
        Panama:         { translation: 'Шляпа',    }
    };
}
