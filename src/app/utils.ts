interface String {
    replaceAll(search: string, replacement: string): string;
}

String.prototype.replaceAll = function (search: string, replacement: string): string {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
