import { Styles } from "./homepage-styles";

export const blogPageStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 2,
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
  },
  headerText: {
    fontFamily: "Arvo",
  },
  profileHeaderItems: {
    display: "flex",
    alignItems: "center",
    padding: 1,
    gap: 2,
  },
  blogTitle: {
    fontSize: "30px",
    textAlign: "center",
    fontFamily: "Arvo",
    fontWeight: "700",
    textShadow: "2px 2px 12px #ccc",
  },
  blogContent: {
    fontSize: "20px",
    textAlign: "justify",
    padding: 5,
    fontFamily: "Work Sans",
    // fontWeight: "700",
    textShadow: "1px 1px 6px #ccc",
  },
  commentBox: {
    padding: 2,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  commentInputContainer: {
    padding: 2,
    width: "30%",
    height: "40%",
  },
  inputLayout: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  textField: {
    width: "100%",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
  },
  commentItem: {
    display: "flex",
    padding: 1,
    gap: 1,
    borderBottom: "1px solid black",
    margin: 1,
    alignItems: "center",
  },
  commentText: {
    margin: 2,
    fontWeight: "600",
    fontSize: "16px",
    fontFamily: "Arvo"
  }
};
