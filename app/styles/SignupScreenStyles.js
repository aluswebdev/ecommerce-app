import { Dimensions, StyleSheet } from 'react-native';


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf6ff", // light blue background
    paddingVertical: 28,
    justifyContent: "center",
    width: width * 0.9,
    margin: "auto",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0077b6", // ocean blue
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff", // light gray background
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12, // rounded corners
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    // Optional shadow (only on iOS, use `elevation` for Android)

  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    marginTop: 4,
  },
  photoButton: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#023e8a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
