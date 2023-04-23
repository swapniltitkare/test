import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { NavLink } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import ChatIcon from "@material-ui/icons/Chat";
import ViewListIcon from "@material-ui/icons/ViewList";
import { MdAssignmentAdd } from "react-icons/md";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { useAuth } from "../context/AuthContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import WorkIcon from "@material-ui/icons/Work";
const ListItems = () => {
  const [{ user }, setAuth] = useAuth();
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuth({ user: null, token: "" });
  };


  function isActiveStudentDashboard(match, location) {
    return location.pathname === '/student/dashboard';
  }

  function Signout() {
    return (
      <>
        <NavLink onClick={logout} to={"/login"}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </NavLink>
      </>
    );
  }
  if (user?.role == 0) {
    return (
      <>
        <NavLink activeClassName="active" isActive={isActiveStudentDashboard} to={"/student/dashboard"}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to={"/student/dashboard/create-profile"}>
          <ListItem button>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Profile" />
          </ListItem>
        </NavLink>
        <NavLink to={"/discussion-forum"}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion Forum" />
          </ListItem>
        </NavLink>
        <NavLink to={"student/dashboard/all-drives"}>
          <ListItem button>
            <img
              src="/images/grid.png"
              width={25}
              style={{ marginRight: "30px" }}
            />

            <ListItemText primary="All Drives" />
          </ListItem>
        </NavLink>
        <NavLink to={"/student/dashboard/view-test"}>
          <ListItem button>
            <img
              src={"/images/classtest.png"}
              style={{ width: "25px", marginRight: "30px" }}
            />

            <ListItemText primary="View Tests" />
          </ListItem>
        </NavLink>
        <NavLink to={"/student/dashboard/view-material"}>
          <ListItem button>
            <ListItemIcon>
              <img src="/images/view-material.png" style={{ width: "25px" }} />
            </ListItemIcon>

            <ListItemText primary="View Material" />
          </ListItem>
        </NavLink>
        <Signout />
      </>
    );
  } else if (user?.role == 1) {
    return (
      <>
        <NavLink to={"/admin/dashboard/"}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to={"/admin/dashboard/add-student"}>
          <ListItem button>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
        </NavLink>

        <NavLink to={"/admin/dashboard/view-all-students"}>
          <ListItem button>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="View All Students" />
          </ListItem>
        </NavLink>
        <NavLink to={"/admin/dashboard/add-notice"}>
          <ListItem button>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Notice" />
          </ListItem>
        </NavLink>
        <NavLink to={"/admin/dashboard/add-test"}>
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Test" />
          </ListItem>
        </NavLink>
        <NavLink to={"/admin/dashboard/add-class-material"}>
          <ListItem button>
            <ListItemIcon>
              <AttachmentIcon />
            </ListItemIcon>
            <ListItemText primary="Add Placement Material" />
          </ListItem>
        </NavLink>
        <NavLink to={"/discussion-forum"}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion Forum" />
          </ListItem>
        </NavLink>
        <Signout />
      </>
    );
  } else if (user?.role == 2) {
    return (
      <>
      <section id="sectionId">

      
        <NavLink  to={`/hr/dashboard/${user._id}/jobs-posted`}>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs Posted" />
          </ListItem>
        </NavLink>
        <NavLink  to={`/hr/dashboard/${user._id}/add-placement`}>
          <ListItem button>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Placement Drive" />
          </ListItem>
        </NavLink>
</section>
        <Signout />
      </>
    );
  } else {
    return <></>;
  }
};

export default ListItems;
