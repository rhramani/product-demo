import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout} style={{margin:'auto',padding:'8px 12px',margin:'3px',backgroundColor:'yellowGreen',fontWeight:'normal',fontSize:'18px',border:'none'}}>Logout</button>
        </div>
    )

}

export default Dashboard;