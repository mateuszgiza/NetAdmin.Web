interface String {
    replaceAll(search: string, replacement: string): string;
}

String.prototype.replaceAll = function (search: string, replacement: string): string {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

interface Date {
    addSeconds(seconds: number): Date;
}

Date.prototype.addSeconds = function (seconds: number): Date {
    let target: Date = this;
    let newDate = new Date(target);
    newDate.setSeconds(target.getSeconds() + seconds);
    return newDate;
};
