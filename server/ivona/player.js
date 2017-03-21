import child_process from 'child_process';
import conf from '../../config.json';

module.exports = function (what) {

  const player = conf.player || 'omxplayer';
  const options = [what.toString()];

  function play(what) {
    return child_process.execFile(player, options, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      // console.log(stdout);
    });
  }
  return play(what);
};

