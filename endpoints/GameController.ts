interface Boost {
    _useTime: Number,
    _effectRange: Range,
    _currentValue: Number,

    getValue: () => Number,
    setValue: (boostValue: Number) => void,
    updateEffectTime: (value: Number) => void,
    isActive: () => boolean
}

class GameController {
    buffs: Boost[] = [];
}
