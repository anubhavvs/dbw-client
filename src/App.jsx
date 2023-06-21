import { useRoutes } from 'react-router-dom';

function App() {
  const content = useRoutes();
  return <>{content}</>;
}

export default App;
