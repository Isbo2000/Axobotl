module.exports = {
  commands: ["updown", "upsidedown"],
  expectedArgs: ["<text>"],
  minArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    hi = text;
    hi = hi.toUpperCase();
    text = hi;
    let Rarray = text.split("");
    let reverseArray = Rarray.reverse();
    let result = reverseArray.join("");
    hi = result;
    hi = hi.replace(/[A]/g, function ($1) {
      return $1 === "A" ? "ɐ" : "A";
    });
    hi = hi.replace(/[B]/g, function ($1) {
      return $1 === "B" ? "q" : "B";
    });
    hi = hi.replace(/[C]/g, function ($1) {
      return $1 === "C" ? "ɔ" : "C";
    });
    hi = hi.replace(/[D]/g, function ($1) {
      return $1 === "D" ? "p" : "D";
    });
    hi = hi.replace(/[E]/g, function ($1) {
      return $1 === "E" ? "ǝ" : "E";
    });
    hi = hi.replace(/[F]/g, function ($1) {
      return $1 === "F" ? "ɟ" : "F";
    });
    hi = hi.replace(/[G]/g, function ($1) {
      return $1 === "G" ? "ƃ" : "G";
    });
    hi = hi.replace(/[H]/g, function ($1) {
      return $1 === "H" ? "ɥ" : "H";
    });
    hi = hi.replace(/[I]/g, function ($1) {
      return $1 === "I" ? "ᴉ" : "I";
    });
    hi = hi.replace(/[J]/g, function ($1) {
      return $1 === "J" ? "ɾ" : "J";
    });
    hi = hi.replace(/[K]/g, function ($1) {
      return $1 === "K" ? "ʞ" : "K";
    });
    hi = hi.replace(/[L]/g, function ($1) {
      return $1 === "L" ? "l" : "L";
    });
    hi = hi.replace(/[M]/g, function ($1) {
      return $1 === "M" ? "ɯ" : "M";
    });
    hi = hi.replace(/[N]/g, function ($1) {
      return $1 === "N" ? "u" : "N";
    });
    hi = hi.replace(/[O]/g, function ($1) {
      return $1 === "O" ? "o" : "O";
    });
    hi = hi.replace(/[P]/g, function ($1) {
      return $1 === "P" ? "d" : "P";
    });
    hi = hi.replace(/[Q]/g, function ($1) {
      return $1 === "Q" ? "b" : "Q";
    });
    hi = hi.replace(/[R]/g, function ($1) {
      return $1 === "R" ? "ɹ" : "R";
    });
    hi = hi.replace(/[S]/g, function ($1) {
      return $1 === "S" ? "s" : "S";
    });
    hi = hi.replace(/[T]/g, function ($1) {
      return $1 === "T" ? "ʇ" : "T";
    });
    hi = hi.replace(/[U]/g, function ($1) {
      return $1 === "U" ? "n" : "U";
    });
    hi = hi.replace(/[V]/g, function ($1) {
      return $1 === "V" ? "ʌ" : "V";
    });
    hi = hi.replace(/[W]/g, function ($1) {
      return $1 === "W" ? "ʍ" : "W";
    });
    hi = hi.replace(/[X]/g, function ($1) {
      return $1 === "X" ? "x" : "X";
    });
    hi = hi.replace(/[Y]/g, function ($1) {
      return $1 === "Y" ? "ʎ" : "Y";
    });
    hi = hi.replace(/[Z]/g, function ($1) {
      return $1 === "Z" ? "z" : "Z";
    });
    message.channel.send(hi);
  },
};
