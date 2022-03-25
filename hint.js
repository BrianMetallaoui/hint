const now = Date.now();
const today = Math.floor(now / 86400000);
const initialDay = 19021;
const puzzleNumber = (today - initialDay) % secretWords.length;
secret = secretWords[puzzleNumber].toLowerCase();
const yesterday = secretWords[puzzleNumber - 1].toLowerCase();
const secretBase64 = btoa(unescape(encodeURIComponent(secret)));
console.log(secretBase64);

async function fetchText() {
  let response = await fetch(
    "https://semantle.novalis.org/nearby_1k/" + secretBase64
  );

  console.log(response.status); // 200
  console.log(response.statusText); // OK

  if (response.status === 200) {
    let data = await response.text();
    var doc = document.getElementById("app");

    const words = data.split("<td> 1</td>");
    const word = words[1].split("</tr>");
    let htmlDoc = stringToHTML(word[0]);

    doc.append(htmlDoc);
  }
}

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

fetchText();
