export const Categories = [
    { name: "Education", img: require("@/assets/education.png") },
    { name: "Travel", img: require("@/assets/travel.png") },
    { name: "Nature", img: require("@/assets/nature.png") },
    { name: "Real Estate", img: require("@/assets/realestate.png") },
    { name: "History", img: require("@/assets/history.png") },
]

export const CategoriesNames = [
    "Education", "Travel", "Nature", "Real Estate", "History"
]

export default {
    getCategory: function (catName) {
        var category
        Categories.forEach((cat) => {
            if (cat.name == catName) {
                category = cat
            }
        })

        return category
    }
}