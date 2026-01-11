import {View, Text} from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/SignupScreenStyles';

const LabelWithIcon = ({ icon, label }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 1 }}>
    <FontAwesome
      name={icon}
      size={16}
      color="gray"
      style={{ marginRight: 5 }}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default LabelWithIcon