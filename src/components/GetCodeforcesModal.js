import React, { Component } from "react";
import { toast } from "react-toastify";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import Admin from "../abis/Admin.json";
import Employee from "../abis/Employee.json";
import "./Modals.css";
import axios from 'axios';

export default class GetEditFieldModal extends Component {
    state = {
        new_username: "",
        loading: false,
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const new_username = this.state.new_username;
        if (!new_username) new_username = this.props.new_username;
        if (!new_username) {
            toast.error("Please enter all the fields.");
            return;
        }
        try {
            const url = `https://codeforces.com/api/user.rating?handle=${this.state.new_username}`;
            let data = await axios.get(url)
        }
        catch (err) {
            toast.error("Please enter valid username");
            return;
        }

        this.setState({ loading: true });
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const AdminData = await Admin.networks[networkId];
        const accounts = await web3.eth.getAccounts();
        if (AdminData) {
            const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
            const employeeContractAddress = await admin?.methods
                ?.getEmployeeContractByAddress(accounts[0])
                .call();
            const EmployeeContract = await new web3.eth.Contract(
                Employee.abi,
                employeeContractAddress
            );
            try {
                await EmployeeContract.methods
                    .setCodeforcesUsername(new_username)
                    .send({
                        from: accounts[0],
                    });
                toast.success("Codeforces Username changed");
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            toast.error("The Admin Contract does not exist on this network!");
        }
        this.props.closeCodeforcesModal();
        this.setState({ loading: false });
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        return (
            <Modal
                as={Form}
                onSubmit={(e) => this.handleSubmit(e)}
                open={this.props.isOpen}
                size="tiny"
                className="modal-des"
            >
                <Header
                    className="modal-heading"
                    icon="pencil"
                    content="Update Fields"
                    as="h2"
                />
                <Modal.Content className="modal-content">
                    <Form className="form-inputs">
                        <Form.Field className="form-inputs">
                            <input
                                id="new_username"
                                placeholder="Codeforces"
                                autoComplete="off"
                                autoCorrect="off"
                                value={this.state.new_username}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions className="modal-actions">
                    <Button
                        className="close-button"
                        type="button"
                        color="red"
                        icon="times"
                        content="Close"
                        onClick={() => this.props.closeCodeforcesModal()}
                    />
                    <Button
                        className="button-css"
                        type="submit"
                        color="green"
                        icon="save"
                        content="Save"
                        loading={this.state.loading}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}
