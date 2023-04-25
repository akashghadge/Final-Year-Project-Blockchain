import Organization from "../abis/OrganizationEndorser.json";
import Admin from "../abis/Admin.json";

const GetOrganizationByName = (input) => {
    return new Promise
        (
            async function (resolve, reject) {
                const account = input;
                const web3 = window.web3;
                console.log(account);
                if (!account || account === undefined || account === null || !web3?.utils.isAddress(account)) {
                    reject("No valid Address");
                    return;
                }
                const networkId = await web3.eth.net.getId();
                const AdminData = await Admin.networks[networkId];
                if (AdminData) {
                    const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
                    const orgContractAddress = await admin?.methods
                        ?.getOrganizationContractByAddress(account)
                        .call();
                    const orgContract = await new web3.eth.Contract(
                        Organization.abi,
                        orgContractAddress
                    );
                    const orgEndData = await orgContract.methods
                        .getOrganizationInfo()
                        .call();
                    const orgEndInfo = {
                        ethAddress: orgEndData[1],
                        name: orgEndData[0],
                        location: orgEndData[2],
                        description: orgEndData[3],
                        OrgLogo: orgEndData[4]
                    };
                    resolve(orgEndInfo)
                }
            }
        )
}
export default GetOrganizationByName;