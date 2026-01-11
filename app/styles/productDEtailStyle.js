import { StyleSheet } from "react-native";
import { COLOR, COLORS } from "../src/constant/theme";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  image: { width: "100%", height: 300 },
  content: { padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // color: COLORS.dark,
    marginBottom: 4,
  },
  price: { fontSize: 18, color: COLORS.primary, marginBottom: 12 },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  metaText: { marginLeft: 8, fontSize: 14, color: "#555" },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    
  },
  description: { fontSize: 14, marginTop: 4 },
  featureItem: { fontSize: 14, marginLeft: 10, marginTop: 2 },
  contactBtn: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  buttonFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 6,
  },

  callButton: {
    marginTop: 16,
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  callText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  contactText: { fontSize: 16, fontWeight: "bold" },
});

export default styles