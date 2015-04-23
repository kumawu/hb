module.exports = function(n) {
    var d = new Date()
    d.setTime(n);
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        localeString : d.toLocaleString()
    }
}