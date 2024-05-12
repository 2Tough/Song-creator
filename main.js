import { HfInference } from "@huggingface/inference";

const hf = new HfInference("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");

const createAudioBtn = document.getElementById("createAudioBtn");
const songDescription = document.getElementById("songDescription")
const loader = document.getElementById("loader")


createAudioBtn.addEventListener("click", async () => {

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/musicgen-small",
      {
        headers: {
          Authorization: "Bearer Hf_Token",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  query({
    inputs: songDescription.value,
  }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
    const audioElement = document.getElementById("song");
    const songUrl = URL.createObjectURL(response);
    audioElement.src = songUrl;
  });
});
