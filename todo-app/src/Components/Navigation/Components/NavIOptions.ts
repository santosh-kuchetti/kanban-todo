import AnalyticsIcon from "../../../assets/SVG/analyticsicon.svg";
import NotificationIcon from "../../../assets/SVG/notificationicon.svg";
import TasksIcon from "../../../assets/SVG/tasksicon.svg";
import TeamIcon from "../../../assets/SVG/teamicon.svg";
import SettingsIcon from "../../../assets/SVG/settingsicon.svg";

const NavOptions = [
  {
    title: "Tasks",
    value: "",
    Icon: TasksIcon,
  },
  {
    title: "Notifications",
    value: "notification",
    Icon: NotificationIcon,
  },
  {
    title: "Analytics",
    value: "analytics",
    Icon: AnalyticsIcon,
  },
  {
    title: "Team",
    value: "team",
    Icon: TeamIcon,
  },
  {
    title: "Settings",
    value: "settings",
    Icon: SettingsIcon,
  },
];

export default NavOptions;
