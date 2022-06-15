import "./sidebar.css";
//MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
const Sidebar = ({ setSelectedPage }) => {
  const myList = [
    {
      id: 1,
      title: "Profile",
      icon: <PersonIcon className="icon" />,
    },
    {
      id: 2,
      title: "Dashboard",
      icon: <DashboardIcon className="icon" />,
    },
    {
      id: 3,
      title: "Products",
      icon: <CategoryIcon className="icon" />,
    },
    {
      id: 4,
      title: "Stats",
      icon: <QueryStatsIcon className="icon" />,
    },
    {
      id: 5,
      title: "Notifications",
      icon: <NotificationsIcon className="icon" />,
    },
    {
      id: 6,
      title: "Settings",
      icon: <SettingsIcon className="icon" />,
    },
    {
      id: 7,
      title: "Logout",
      icon: <LogoutIcon className="icon" />,
    },
  ];
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Logo Area</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          {myList.map((element) => (
            <li onClick={() => setSelectedPage(element.title)}>
              {element.icon}
              <span>{element.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
