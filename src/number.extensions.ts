interface Number {
    toBinaryFormat(pad?: number): string;
    toHexFormat(pad?: number): string;
}

Number.prototype.toBinaryFormat = function(pad = 8) {
    return this.toString(2).padStart(pad, '0')
}

Number.prototype.toHexFormat = function(pad = 2) {
    return this.toString(16).padStart(pad, '0')
}