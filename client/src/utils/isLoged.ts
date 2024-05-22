function isLoged() {
  return !!localStorage.getItem("auth_token");
}
export default isLoged;
