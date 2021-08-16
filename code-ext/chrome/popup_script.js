function hello() {
//   alert("hello world");
//   console.log("hello world");
  document.body.innerHTML = "mutated";
}


document.getElementById("btnTest").addEventListener("click", hello);

