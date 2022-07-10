import { Link } from "react-router-dom";

const styleSheet = {
  wrapper: {
    width: "100%",
    padding: "10px 0",

    textAlign: "center",
    borderBottom: "1px solid grey"
  }
};

const Header = () => {
  return (
    <div style={styleSheet.wrapper}>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              fontSize: "4rem",
              color: "rgb(152, 223, 71)"
            }}
          >
            Memo
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
