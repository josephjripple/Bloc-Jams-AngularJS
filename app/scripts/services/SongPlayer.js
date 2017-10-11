(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Store current chosen album
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
           if (currentBuzzObject) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
           });

           SongPlayer.currentSong = song;
         };

         /**
         * @function playSong
         * @desc Plays the currentBuzzObject and sets song property to true
         * @param {Object} song
         */

         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;
         };

         /**
         * @function stopSong
         * @desc Stops the song from playing and removes from play status
         * @param {Object} song
         */
         var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
         };

         /**
         * @function getSongIndex
         * @desc Get the index of selected song from array on current albumctrl
         * @param {Object} song
         */
         var getSongIndex = function(song) {
           return currentAlbum.songs.indexOf(song);
         };

         SongPlayer.currentSong = null;

         /**
         * @function SongPlayer.play
         * @desc Plays currentSong from beginning or paused state
         * @param {Object} song
         */

         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

         } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  playSong(song);
              }
         }
      };

      /**
      * @function SongPlayer.pause
      * @desc pauses current song
      * @param {Object} song
      */

        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc Skips to previous song to play
        * @param {Object} song
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            stopSong(SongPlayer.currentSong);
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        /**
        * @function SongPlayer.next
        * @desc Skips to nexst song to play
        * @param {Object} song
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex > currentAlbum.songs.length - 1) {
              stopSong(SongPlayer.currentsong);
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer);
})();
