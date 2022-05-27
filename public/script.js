//const body = document.getElementById("body");
const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const btnDNI = document.getElementById("btnDNI");
const resultText = document.getElementById("resultText");
const ul = document.getElementById("ul");
//let prueba = "";

const getUniqueDNI = (text) => {
  if (text) {
    //console.log(prueba);
    const textArray = text.split("\n");
    //console.log(textArray);
    let dniArray = textArray.filter(
      (word) => word.length === 10 && !word.includes("/")
    );
    dniArray = dniArray.map((dni) => dni.slice(2));
    console.log(dniArray);
    const uniqueDNI = [...new Set(dniArray)].sort((a, b) => a - b);
    console.log(uniqueDNI);
    uniqueDNI.map((dni) => {
      const node = document.createElement("li");
      node.appendChild(document.createTextNode(dni));
      ul.appendChild(node);
    });
  }
};

btnUpload.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("pdfFile", inpFile.files[0]);
  fetch("/extract-text", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((extractedText) => {
      //resultText.value = extractedText;
      getUniqueDNI(extractedText);
    });
});
