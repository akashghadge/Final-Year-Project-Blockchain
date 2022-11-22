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
import Navbar from "./components/Navbar";
import GetEmployee from "./pages/GetRoutes/GetEmployee";
import GetOrg from "./pages/GetRoutes/GetOrg";
import NoRole from "./pages/NoRole/NoRole";
import Notifications from "./pages/NoRole/Notifications";
import NotificationsAdmin from "./pages/Admin/Notifications";
import LoadComp from "./components/LoadComp";

function App() {
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

  useEffect(() => {
    const func = async () => {
      setisMeta(true);
      setloadcomp(true);
      if (window.ethereum) {
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
    return () => { };
  }, []);

  const adminRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={AllEmployees} />
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

  const noRoleRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={NoRole} />
        <Route path="/notifications" exact component={Notifications} />
      </Switch>
    );
  };

  const renderRoutes = () => {
    if (isOwner) return adminRoutes();
    else return noRoleRoutes();
  };

  return (
    <div>
      {loadcomp ? (
        <LoadComp />
      ) : isMeta && account !== "" ? (
        <BrowserRouter>
          <Navbar />
          <Container>
            <ToastContainer />
            <Switch>
              <Route
                path="/getemployee/:employee_address"
                exact
                component={GetEmployee}
              />
              <Route path="/getOrg/:orgAddress" exact component={GetOrg} />
              {renderRoutes()}
            </Switch>
          </Container>
        </BrowserRouter>
      ) : (
        <MetaMaskGuide />
      )}
    </div>
  );
}

export default App;
