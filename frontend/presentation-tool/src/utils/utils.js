export default {
    generateStoragePathName: function (pathName,fileName){
        pathName = pathName.toString().toLowerCase()
        pathName = pathName.replace(/\s+/g, '-')
        pathName = `${pathName}/${fileName}`
        return pathName
    },
    createID: function () {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
          }
        )
        return uuid;
      },
      toMilliseconds: function (min, sec) {
        console.log(min, sec);
        var milliseconds = min * 60;
        milliseconds += sec;
        milliseconds *= 1000;
        return milliseconds;
      },
      fromMilliseconds: function(durationMili){
        var parsedDuration = { minutes: '', seconds: '' }
        var mili = durationMili / 1000 //transform to seconds
        parsedDuration.minutes = Math.floor(mili / 60) //transform to minutes
        parsedDuration.seconds = mili - (parsedDuration.minutes * 60)

        return parsedDuration
      },
      removeNullFields: function(storage){
        for(var i = 0; i < storage.media.length; i++){
          if(storage.media[i] == null){
            storage.media.splice(i,1)
            storage.screens.splice(i,1)
          }
        }

        return storage
      }
}

