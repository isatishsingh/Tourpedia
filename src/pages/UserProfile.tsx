import { Home, User, Clock, History, Pencil, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import userAvatar from "@/assets/Maddison.jpeg";
import dummyImg from "@/assets/dummy.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase-key-code/firebase-auth-2-O";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const {uid, displayName, email, photoURL} = user ?? {uid: "0", displayName: "John Dio", email: "johndio030@gmail.com", photoURL: dummyImg};
  console.log(photoURL," <=17");
  const [UserfirstName, ...rest] = (displayName ?? "").split(" ");
  const UserlastName = rest.join(" ") || "";
  const menuItems = [
    { icon: Home, label: "Home", active: false },
    { icon: FileText, label: "View Requests", active: false, badge: "3" },
    { icon: Clock, label: "Track Request", active: false },
    { icon: History, label: "History", active: false },
    { icon: User, label: "My profile", active: true },
  ];

  const userData = {
    name: "Umaima Faisal",
    role: "Donor",
    location: "Amritsar, Punjab, India",
    firstName: "Umaima",
    lastName: "Faisal",
    email: "Umaimail030@gmail.com",
    phone: "0316-4567890",
    country: "India",
    cityState: "Amritsar,Punjab",
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen flex bg-background overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-sidebar-bg border-r border-border flex flex-col">
          {/* User Info Section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img
                src={photoURL || dummyImg}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {displayName}
                </h3>
                <p className="text-muted-foreground text-xs">{userData.role}</p>
                <p className="text-muted-foreground text-xs">{userData.location}</p>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h4 className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-4">
              Menu
            </h4>
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${item.active
                    ? "bg-sidebar-active text-sidebar-active-text font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-notification-badge text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <div
              className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Account Settings
          </h1>

          <div className="space-y-6">
            {/* My Profile Card */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={photoURL || dummyImg}
                      alt="Profile Avatar"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {displayName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {userData.role}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {userData.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Personal information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="text-muted-foreground text-sm">
                      First Name
                    </label>
                    <p className="font-medium text-foreground">
                      {UserfirstName}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Last Name
                    </label>
                    <p className="font-medium text-foreground">
                      {UserlastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Email Address
                    </label>
                    <p className="font-medium text-foreground">
                      {email}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">Phone</label>
                    <p className="font-medium text-foreground">
                      {userData.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">Role</label>
                    <p className="font-medium text-foreground">{userData.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Card */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Address</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="text-muted-foreground text-sm">Country</label>
                    <p className="font-medium text-foreground">
                      {userData.country}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      City/State
                    </label>
                    <p className="font-medium text-foreground">
                      {userData.cityState}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
