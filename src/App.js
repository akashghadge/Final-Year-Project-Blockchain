import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import Admin from "./abis/Admin.json";
import "react-toastify/dist/ReactToastify.css";
import MetaMaskGuide from "./MetaMaskGuide";
import { Container } from "semantic-ui-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPageCreate from "./pages/Admin/CreateUser";
import AllEmployees from "./pages/Admin/AllEmployees";
import AllOrganizationEndorser from "./pages/Admin/AllOrganizationEndorser";
import EmployeePage from "./pages/Employee/Employee";
import UpdateProfile from "./pages/Employee/UpdateProfile";
import Organization from "./pages/OrganizationEndorser/Organization";
import EndorseSkill from "./pages/OrganizationEndorser/EndorseSkill";
import Endorse from "./pages/OrganizationEndorser/EndorseSection";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GetEmployee from "./pages/GetRoutes/GetEmployee";
import GetOrg from "./pages/GetRoutes/GetOrg";
import NoRole from "./pages/NoRole/NoRole";
import Notifications from "./pages/NoRole/Notifications";
import NotificationsAdmin from "./pages/Admin/Notifications";
import NotificationsEmployee from "./pages/Employee/Notifications";
import NotificationsOrg from "./pages/OrganizationEndorser/Notifications";
import PublicEmployee from "./pages/PublicEmployee/PublicEmployee"
import LoadComp from "./components/LoadComp";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [isMeta, setisMeta] = useState(false);
  const [isEmployee, setisEmployee] = useState(false);
  const [account, setaccount] = useState("");
  const [isOrganizationEndorser, setisOrganizationEndorser] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [loadcomp, setloadcomp] = useState(false);

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setaccount(accounts[0]);
    }
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
      const isEmployee = await admin?.methods?.isEmployee(accounts[0]).call();
      const isOrganizationEndorser = await admin?.methods
        ?.isOrganizationEndorser(accounts[0])
        .call();
      const owner = await admin?.methods?.owner().call();
      setisEmployee(isEmployee);
      setisOrganizationEndorser(isOrganizationEndorser);
      setisOwner(owner === accounts[0]);
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };
  let [accountChange, setAccountChange] = useState(0);
  useEffect(() => {
    const func = async () => {
      setisMeta(true);
      setloadcomp(true);
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          history.push("/");
          setAccountChange(accountChange + 1);
        });
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        window.web3 = await new Web3(window.ethereum);
        await loadBlockChainData();
      } else if (window.web3) {
        window.web3 = await new Web3(window.web3.currentProvider);
        await loadBlockChainData();
      } else {
        setisMeta(false);
      }
      setloadcomp(false);
    };
    func();
    return () => {
      //
    };
  }, [accountChange]);

  const adminRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/all-employees" exact component={AllEmployees} />
        <Route
          path="/all-organization-endorser"
          exact
          component={AllOrganizationEndorser}
        />
        <Route path="/create-user" exact component={AdminPageCreate} />
        <Route path="/notifications" exact component={NotificationsAdmin} />
      </Switch>
    );
  };

  const employeeRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/employee-profile" exact component={EmployeePage} />
        <Route path="/update-profile" exact component={UpdateProfile} />
        <Route path="/notifications" exact component={NotificationsEmployee} />
      </Switch>
    );
  };

  const isOrganizationEndorserRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/organization" exact component={Organization} />
        <Route path="/endorse-skill" exact component={EndorseSkill} />
        <Route path="/endorse-section" exact component={Endorse} />
        <Route path="/notifications" exact component={NotificationsOrg} />
      </Switch>
    );
  };

  const noRoleRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/no-role" exact component={NoRole} />
        <Route path="/notifications" exact component={Notifications} />
      </Switch>
    );
  };

  const renderRoutes = () => {
    if (isOwner) return adminRoutes();
    else if (isEmployee) return employeeRoutes();
    else if (isOrganizationEndorser) return isOrganizationEndorserRoutes();
    else return noRoleRoutes();
  };

  return (
    <div>
      {loadcomp ? (
        <LoadComp />
      ) : isMeta && account !== "" ? (
        <>
          <Navbar />
          <Container>
            <ToastContainer />
            <Switch>
              <Route
                path="/getemployee/:employee_address"
                exact
                component={GetEmployee}
              />
              <Route path="/employee-public/:account" exact component={PublicEmployee} />
              <Route path="/getOrg/:orgAddress" exact component={GetOrg} />
              {renderRoutes()}
            </Switch>
          </Container>
        </>
      ) : (
        <>
          <Home />
          <MetaMaskGuide />
        </>
      )}
    </div>
  );
}

export default App;
