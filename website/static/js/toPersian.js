String.prototype.toPersian= function() {
    return this.replace(/\d/g, d =>  '۰۱۲۳۴۵۶۷۸۹'[d])
}