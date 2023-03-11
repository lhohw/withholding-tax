import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/Header";
import Table from "components/Table";

const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Table />
    </ErrorBoundary>
  );
};

export default App;
