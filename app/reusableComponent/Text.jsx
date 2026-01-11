import { Text as RNText } from "react-native";

export function Text({ className, variant = "body", ...props }) {
  let fontClass = "font-body";
  if (variant === "heading") fontClass = "font-heading";
  if (variant === "medium") fontClass = "font-medium";

  return <RNText className={`${fontClass} ${className}`} {...props} />;
}
