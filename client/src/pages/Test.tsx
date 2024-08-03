import { useState } from "react";

const ParentComponent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    return (
      <div>
        <Test isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    );
  };
  
  const Test: React.FC<{ isLoading: boolean, setIsLoading: (loading: boolean) => void }> = ({ isLoading, setIsLoading }) => {
    return (
      <div>
        {isLoading ? 'Loading...' : 'Not Loading'}
        <button onClick={() => setIsLoading(true)}>Start Loading</button>
      </div>
    );
  };

export default Test