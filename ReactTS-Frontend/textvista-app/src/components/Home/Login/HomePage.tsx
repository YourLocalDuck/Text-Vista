import { useNavigate } from "react-router-dom";

export const HomePage:React.FC = () => {
    const navigate = useNavigate();
    
    return (
      <div>
      <h1>Text Gallery App</h1>
      <button onClick={() => navigate("/text")}>File Upload Page</button>
    </div>
    );
}