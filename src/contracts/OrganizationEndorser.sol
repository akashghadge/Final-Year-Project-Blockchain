pragma solidity >=0.5.0 <0.9.0;

contract OrganizationEndorser {
  address admin;
  string name;
  address organization_address;
  string description;
  string location;
  string OrgLogo;

  constructor(
    address _admin,
    address _organization_address,
    string memory _name,
    string memory _description,
    string memory _location,
    string memory _OrgLogo
  ) public {
    admin = _admin;
    name = _name;
    organization_address = _organization_address;
    description = _description;
    location = _location;
    OrgLogo = _OrgLogo;
  }

  function getOrganizationInfo()
    public
    view
    returns (
      string memory,
      address,
      string memory,
      string memory,
      string memory
    )
  {
    return (name, organization_address, description, location, OrgLogo);
  }

  address[] allEmployees;

  function addEmployees(address employee_address) public {
    require(msg.sender == organization_address);
    allEmployees.push(employee_address);
  }

  function totalEmployees() public view returns (uint256) {
    return allEmployees.length;
  }

  function getEmployeeByIndex(uint256 index) public view returns (address) {
    return allEmployees[index];
  }
}
