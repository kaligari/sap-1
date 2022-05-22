interface Number {
    toBinaryFormat(pad?: number): string;
}

Number.prototype.toBinaryFormat = function(pad = 8) {
    return this.toString(2).padStart(pad, '0')
}