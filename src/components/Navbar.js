import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, Segment, Label, Icon, Image} from "semantic-ui-react";
import Admin from "../abis/Admin.json";
import { Link } from "react-router-dom";
// import SearchBar from "./SearchBar";
import GenererateQR from "./GenererateQR";

class Navbar extends Component {
  state = { activeItem: "home", role: -1, account: "", showQr: false };

  componentDidMount = async () => {
    const web3 = await window.web3;
    console.log(web3);
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      this.setState({ account: accounts[0] });
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
      var role = -1;
      if (accounts[0] === owner) {
        role = 0;
      } else if (isEmployee) {
        role = 1;
      } else if (isOrganizationEndorser) {
        role = 2;
      }
      this.setState({ role });
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && e.target.value != ""){
      this.props.history.push(
        `/employee-public/${e.target.value}`
      );
      e.target.value = ""
    }
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  closeQRModal = () => {
    this.setState({ showQr: false });
  };

  render() {
    const { activeItem } = this.state;
    const roles = ["Admin", "Employee", "Organization"];

    return (
      <>
       {/* <GenererateQR
    isOpen={this.state.showQr}
    closeQRModal={this.closeQRModal}
    /> */}
      <div class="logged-out env-production page-responsive header-overlay" style={{"word-wrap": "break-word"}}>
        <header class="Header-old header-logged-out js-details-container Details position-relative f4 py-3" role="banner">
  
      <div
        class="d-flex flex-column flex-lg-row flex-items-center p-responsive height-full position-relative z-1 mx-md-5">
        <div class="d-flex flex-justify-between flex-items-center width-full width-lg-auto ml-md-5">
                <div
                style={{
                  background: "white",
                  display: "grid",
                  justifyItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "45px",
                  width: "45px",
                  borderRadius: "100%",
                  padding: "8px",
                  marginBottom: "-5px",
                }}
              >
                <Image src="https://static.thenounproject.com/png/3293529-200.png" />
              </div>
        </div>
  
        <div
          class="HeaderMenu--logged-out p-responsive height-fit position-lg-relative d-lg-flex flex-column flex-auto pt-7 pb-4 top-0">
          <div
            class="header-menu-wrapper d-flex flex-column flex-self-end flex-lg-row flex-justify-between flex-auto p-3 p-lg-0 rounded rounded-lg-0 mt-3 mt-lg-0">
          <GenererateQR
          isOpen={this.state.showQr}
          closeQRModal={this.closeQRModal}
        />
        <Segment
        
          style={{
            margin:"0",
            width:"100%",
            border: "none",
            background: "transparent",
            boxShadow:"none"
          }}
        >
          <Menu
            inverted
            pointing
            secondary
            style={{
              border:"none"
            }}
          >
            {/* <Menu.Item
              as={Link}
              to="/"
              style={{ marginRight: "25px", padding: "0px" }}
            >
            </Menu.Item>
            <Menu.Item
              style={{ marginRight: "25px", padding: "0px" }}
              position="left"
            >
             <SearchBar />
            </Menu.Item> */}
                  <Menu.Item
                  as={Link}
                  to="/"
                  name="Home"
                  onClick={this.handleItemClick}
                />
            {this.state.role === 0 && (
              <>
                <Menu.Item
                  as={Link}
                  to="/all-employees"
                  name="Employees"
                  // active={activeItem === "Employees"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/all-organization-endorser"
                  name="Organization Endorsers"
                  // active={activeItem === "Organization Endorsers"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/create-user"
                  name="Create User"
                  // active={activeItem === "Create User"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/notifications"
                  name="Notifications"
                  // active={activeItem === "Notifications"}
                  onClick={this.handleItemClick}
                />
              </>
            )}
            {this.state.role === 1 && (
              <>
                <Menu.Item
                  as={Link}
                  to="/employee-profile"
                  name="Profile"
                  // active={activeItem === "Profile"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/update-profile"
                  name="Update Profile"
                  // active={activeItem === "Update Profile"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/notifications"
                  name="Notifications"
                  // active={activeItem === "Notifications"}
                  onClick={this.handleItemClick}
                />
              </>
            )}

            {this.state.role === 2 && (
              <>
                <Menu.Item
                  as={Link}
                  to="/organization"
                  name="Info Page"
                  // active={activeItem === "Info Page"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/endorse-skill"
                  name="Endorse Skill"
                  // active={activeItem === "Endorse Skill"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/endorse-section"
                  name="Endorse Section"
                  // active={activeItem === "Endorse Section"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/notifications"
                  name="Notifications"
                  // active={activeItem === "Notifications"}
                  onClick={this.handleItemClick}
                />
              </>
            )}

            {this.state.role === -1 && (
              <>
                <Menu.Item
                  as={Link}
                  to="/no-role"
                  name="Request Admin For Role"
                  // active={activeItem === "Request Admin For Role"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/notifications"
                  name="Notifications"
                  // active={activeItem === "Notifications"}
                  onClick={this.handleItemClick}
                />
              </>
            )}
             <form class="mx-auto" role="search" method="get">
                      <label class="form-control header-search-wrapper input-sm p-0 header-search-wrapper-jump-to position-relative d-flex flex-justify-between flex-items-center">
                        <input type="text"
                          class="form-control js-site-search-focus header-search-input jump-to-field js-jump-to-field"
                          placeholder="Type here to search Employee"
                          onKeyPress={this.handleKeyPress}
                          />
                      </label>
                    </form>
            </Menu>
        </Segment>
            {/* <Menu.Item position="right">
              <Label style={{ color: "black", background: "white" }}>
                {this.state.role === -1 ? "No Role" : roles[this.state.role]}
              </Label>
              &nbsp;&nbsp;&nbsp;
              <div style={{ color: "lightgray" }}>
                <em>
                  <small>{this.state.account}</small>
                </em>
                &nbsp;&nbsp;&nbsp;
                <Icon
                  name="qrcode"
                  size="large"
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => this.setState({ showQr: true })}
                />
              </div>
            </Menu.Item> */}
            <div class="d-lg-flex flex-items-center px-3 px-lg-0 mb-3 mb-lg-0 text-center text-lg-left">
              <nav class="d-flex mt-0 px-3 px-lg-0 mb-3 mb-lg-0" aria-label="Global">
              <Menu.Item position="right" style={{display:"flex", alignItems: "center",
                  justifyContent: "center"}}>
              <Label style={{ color: "black", background: "white" }}>
                {this.state.role === -1 ? "No Role" : roles[this.state.role]}
              </Label>
              &nbsp;&nbsp;&nbsp;
              <div style={{display:'flex', color: "lightgray",alignItems: "center",
                  justifyContent: "center" }}>
                <em>
                  <small>{this.state.account}</small>
                </em>
                &nbsp;&nbsp;&nbsp;
                <Icon
                  name="qrcode"
                  size="large"
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => this.setState({ showQr: true })}
                />
              </div>
            </Menu.Item>
            
              </nav>
              
            </div>
          </div>
        </div>
      </div>
    </header></div>
    </>
    )
  }
}

export default withRouter(Navbar);

// import React from 'react'

// function Navbar() {
//   return (
//     <div class="logged-out env-production page-responsive header-overlay" style={{"word-wrap": "break-word"}}>
//       <header class="Header-old header-logged-out js-details-container Details position-relative f4 py-3" role="banner">

//     <div
//       class="container-xl d-flex flex-column flex-lg-row flex-items-center p-responsive height-full position-relative z-1">
//       <div class="d-flex flex-justify-between flex-items-center width-full width-lg-auto">
//         <a class="mr-lg-3 color-fg-inherit flex-order-2" href="https://github.com/" aria-label="Homepage"
//           data-ga-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
//           <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true"
//             class="octicon octicon-mark-github">
//             <path fill-rule="evenodd"
//               d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
//             </path>
//           </svg>
//         </a>

//       </div>

//       <div
//         class="HeaderMenu--logged-out p-responsive height-fit position-lg-relative d-lg-flex flex-column flex-auto pt-7 pb-4 top-0">
//         <div
//           class="header-menu-wrapper d-flex flex-column flex-self-end flex-lg-row flex-justify-between flex-auto p-3 p-lg-0 rounded rounded-lg-0 mt-3 mt-lg-0">
//           <nav class="d-flex mt-0 px-3 px-lg-0 mb-3 mb-lg-0" aria-label="Global">
//             <ul class="d-lg-flex list-style-none">
//             <li> <link class="HeaderMenu-link mx-4 mt-3" href="#"/>Home </li>
//            <li> <link class="HeaderMenu-link mx-4 mt-3" href="#"/>Employees </li>
//            <li> <link class="HeaderMenu-link mx-4 mt-3" href="#"/>E-Course Institute </li>
//            <li> <link class="HeaderMenu-link mx-4 mt-3" href="#"/>Organizations </li>
//               <div class="d-lg-flex min-width-0 mb-2 mb-lg-0 px-lg-3">
//                 <div class="header-search flex-auto position-relative flex-self-stretch flex-md-self-auto mb-3 mb-md-0 mr-0 mr-md-3 js-jump-to">
//                   <div class="position-relative"></div>
//                   <form class="mb-0 my-2" role="search" method="get">
//                     <label class="form-control header-search-wrapper input-sm p-0 header-search-wrapper-jump-to position-relative d-flex flex-justify-between flex-items-center">
//                       <input type="text"
//                         class="form-control js-site-search-focus header-search-input jump-to-field js-jump-to-field"
//                         placeholder="Type here to search"/>
//                     </label>
//                   </form>
//                 </div>
//               </div>
//             </ul>
//           </nav>

//           <div class="d-lg-flex flex-items-center px-3 px-lg-0 mb-3 mb-lg-0 text-center text-lg-left">
//             <nav class="d-flex mt-0 px-3 px-lg-0 mb-3 mb-lg-0" aria-label="Global">
//               <ul class="d-lg-flex list-style-none">
//                 <li class="HeaderMenu-link no-underline px-0 px-lg-2 py-3 py-lg-2 d-block d-lg-inline-block"
//                   href="/pricing">No Role : 0X1298472035705729038748
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header></div>
//   )
// }

// export default Navbar