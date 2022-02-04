import resultWinAudio from 'assets/audio/result-win.mp3';
import jackpotAudio from 'assets/audio/jackpot.mp3';
import dealAudio from 'assets/audio/dealing-cards.mp3';
import invertCardAudio from 'assets/audio/invert-card.mp3';
import colorWin from 'assets/audio/color-win.mp3';

function playWinner() {
  const audio = new Audio(resultWinAudio);
  audio.play();
}

function playJackpot() {
  const audio = new Audio(jackpotAudio);
  audio.play();
}

function playDeal() {
  const audio = new Audio(dealAudio);
  audio.play();
}

function playInvertCard() {
  const audio = new Audio(invertCardAudio);
  audio.play();
}

function playWinColor() {
  const audio = new Audio(colorWin);
  audio.play();
}

export default {
  playWinner,
  playJackpot,
  playDeal,
  playInvertCard,
  playWinColor,
};
