import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/Header";

const App = () => {
  return (
    <ErrorBoundary>
      <Header />
    </ErrorBoundary>
  );
};

export default App;
