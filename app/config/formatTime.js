// utils/formatTime.js
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.floor((now - date) / 1000); // difference in seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }
  if (diff < 86400) {
    const hrs = Math.floor(diff / 3600);
    return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  }

  // check if yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  // older messages: show date in `DD MMM` format
  const options = { day: "numeric", month: "short" };
  return date.toLocaleDateString(undefined, options); // e.g., 22 Nov
};
