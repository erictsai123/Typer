const default_data = { username: "", stats: [] };
export default function login(data = default_data, action) {
  switch (action.type) {
    case "login":
      return { ...data, username: action.payload };
    case "logout":
      return default_data;
    case "statsSummary":
      return { ...data, stats: [...data.stats].concat(action.payload) };
    default:
      return data;
  }
}
