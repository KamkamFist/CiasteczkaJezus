
function zapiszCiasteczko(nazwa, wartosc, dni = 365) {
  const data = new Date();
  data.setTime(data.getTime() + (dni * 24 * 60 * 60 * 1000));
  document.cookie = `${nazwa}=${JSON.stringify(wartosc)};expires=${data.toUTCString()};path=/`;
}


function pobierzCiasteczko(nazwa) {
  const dopasuj = document.cookie.match(new RegExp("(^| )" + nazwa + "=([^;]+)"));
  return dopasuj ? JSON.parse(dopasuj[2]) : null;
}


let odwiedziny = pobierzCiasteczko("odwiedziny") || 0;
let klikniecia = parseInt(sessionStorage.getItem("klikniecia")) || 0;
let historia = pobierzCiasteczko("historia") || [];


odwiedziny++;
zapiszCiasteczko("odwiedziny", odwiedziny);

document.getElementById("Odwiedziny").textContent = "Liczba odwiedzin: " + odwiedziny;
document.getElementById("Klikniecia").textContent = "Kliknięcia (w tej sesji): " + klikniecia;

const teraz = new Date();
const wpis = "Wejście: " + teraz.toLocaleDateString() + " " + teraz.toLocaleTimeString();
historia.push(wpis);
zapiszCiasteczko("historia", historia);

function pokazHistorie() {
  const lista = document.getElementById("sessionHistory");
  lista.innerHTML = "";
  historia.forEach(wpis => {
    const el = document.createElement("li");
    el.textContent = wpis;
    lista.appendChild(el);
  });
}
pokazHistorie();

document.getElementById("clickArea").addEventListener("click", () => {
  klikniecia++;
  sessionStorage.setItem("klikniecia", klikniecia);
  document.getElementById("Klikniecia").textContent = "Kliknięcia (w tej sesji): " + klikniecia;
});

function resetujWszystko() {
  zapiszCiasteczko("odwiedziny", 0);
  zapiszCiasteczko("historia", []);
  sessionStorage.setItem("klikniecia", 0);
  location.reload();
}

function resetujOdwiedziny() {
  zapiszCiasteczko("odwiedziny", 0);
  location.reload();
}

function resetujKlikniecia() {
  sessionStorage.setItem("klikniecia", 0);
  location.reload();
}

function resetujHistorie() {
  zapiszCiasteczko("historia", []);
  location.reload();
}
