import { FirebaseContext } from "./FirebaseContext";

const withContext = (Component) => {
  return (props) => (
    <FirebaseContext.Consumer>
      {(value) => <Component {...props} value={value} />}
    </FirebaseContext.Consumer>
  );
};

export default withContext;
