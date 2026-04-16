async function translateText() {
  const key = document.getElementById("key").value;
  const region = document.getElementById("region").value;
  const fileInput = document.getElementById("fileInput").files[0];
  const textInput = document.getElementById("textInput").value;
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;

  let text = "";

  try {
    // 👉 Priority 1: Textbox
    if (textInput.trim() !== "") {
      text = textInput;
    }
    // 👉 Priority 2: File
    else if (fileInput) {
      text = await fileInput.text();
    }
    // 👉 If nothing provided
    else {
      alert("Please enter text or upload a file");
      return;
    }

    const response = await fetch(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": region,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([{ Text: text }])
      }
    );

    const data = await response.json();

    if (!data || !data[0]) {
      throw new Error("Translation failed");
    }

    document.getElementById("output").innerText =
      data[0].translations[0].text;

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Check API key, region, or input.");
  }
}