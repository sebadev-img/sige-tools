const inpFile = document.getElementById("inpFile");
const textFile = document.getElementById("textFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const ul = document.getElementById("ul");

btnUpload.disabled = true;

const getUniqueDNI = (text) => {
  if (text) {
    const textArray = text.split("\n");
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
      node.addEventListener("click", () => {
        node.classList.toggle("complete");
      });
      ul.appendChild(node);
    });
  }
};

inpFile.addEventListener("change", () => {
  if (inpFile.value) {
    textFile.innerHTML = inpFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    btnUpload.disabled = false;
  } else {
    textFile.innerHTML = "Ningun Archivo Seleccionado";
  }
});

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
      getUniqueDNI(extractedText);
    });
});
