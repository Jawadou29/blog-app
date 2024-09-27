function Footer() {
  return (
    <footer style={styles}>
      copyright 2024 &copy;
    </footer>
  )
}
const styles = {
  color: "var(--white-color)",
  fontSize: "17px",
  backgroundColor: "var(--blue-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",
}

export default Footer