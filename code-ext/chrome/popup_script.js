function hello() {
  document.body.innerHTML = "mutated";
}


document.getElementById("btnTest").addEventListener("click", hello);

