module.exports = {
    findIdIn: function (array, id) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) return array[i];
        }
    }
}