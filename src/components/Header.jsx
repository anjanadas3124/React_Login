const Header = ({ title }) => {
  return (
    <div style={styles.header}>
      <h3>{title}</h3>
    </div>
  );
};

const styles = {
  header: {
    padding: "15px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
  },
};

export default Header;