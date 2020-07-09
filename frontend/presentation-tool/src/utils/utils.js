export default {
    generateStoragePathName: function (pathName,fileName){
        pathName = pathName.toString().toLowerCase()
        pathName = pathName.replace(/\s+/g, '-')
        pathName = `${pathName}/${fileName}`
        return pathName
    }
}

