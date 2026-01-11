import {
  requestPermissionsAsync,
  startAsync,
  stopAsync,
} from "expo-speech-recognition";

const startVoiceSearch = async (setSearchText) => {
  try {
    const { granted } = await requestPermissionsAsync();
    if (!granted) {
      alert("Microphone permission is required for voice search.");
      return;
    }

    await startAsync({
      language: "en-US",
      interimResults: true,
      onResult: (event) => {
        if (event.text) {
          setSearchText(event.text);
        }
      },
    });

    console.log("🎙️ Listening... Speak now!");

    setTimeout(() => {
      stopAsync();
      console.log("🛑 Listening stopped");
    }, 5000);
  } catch (error) {
    console.error("Voice search error:", error);
  }
};
export default startVoiceSearch;