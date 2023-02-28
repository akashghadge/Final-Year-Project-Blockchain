import { logDOM } from "@testing-library/react";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { Button, Form, Header, Input, Modal, Checkbox, Label, Dropdown } from "semantic-ui-react";
import Admin from "../abis/Admin.json";
import Employee from "../abis/Employee.json";
import "./Modals.css";
import ScanQR from "./ScanQR";
import UploadImageModal from "./UploadImageModal"
export default class GetCertificationModal extends Component {
  state = {
    name: "",
    organization: "",
    score: "",
    loading: false,
    scanQR: false,
    isScoreInput: true,
    imageUploadModal: false,
    certificateImage: null,
    selectCourse: "",
    courseOptions: [
      {
        key: "course 1",
        text: "course 1",
        value: "course 1"
      },
      {
        key: "course 2",
        text: "course 2",
        value: "course 2"
      },
      {
        key: "course 3",
        text: "course 3",
        value: "course 3"
      }
    ]
  };
  handleSubmit = async (e) => {
    const { name, organization, score, certificateImage, isScoreInput, selectCourse } = this.state;
    if (!name || !organization || !(score >= 1 && score <= 100)) {
      toast.error("Please enter all the fields.");
      return;
    }
    this.setState({ loading: true });
    e.preventDefault();
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
          .addCertification(name, organization, score)
          .send({
            from: accounts[0],
          });
        toast.success("Certification saved successfullyy!!");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
    this.setState({ loading: false });
    this.props.closeCertificationModal();
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  closeScanQRModal = () => {
    this.setState({ scanQR: false });
  };
  closeImageUploadModal = () => {
    this.setState({ imageUploadModal: false });
  };

  handleAddAddress = (res) => {
    this.setState({ organization: res });
  };
  onChangeCheckbox = (e, d) => {
    this.setState({ isScoreInput: !this.state.isScoreInput });
  };
  uploadSubmitImage = (d) => {
    this.setState({ certificateImage: d });
    this.setState({ imageUploadModal: false });
  }
  render() {
    return (
      <>
        <ScanQR
          isOpen={this.state.scanQR}
          closeScanQRModal={this.closeScanQRModal}
          handleAddAddress={this.handleAddAddress}
        />
        <UploadImageModal
          isOpen={this.state.imageUploadModal}
          closeImageModal={this.closeImageUploadModal}
          uploadSubmitImage={this.uploadSubmitImage}
        />
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
            content="Enter Certification Details"
            as="h2"
          />
          <Modal.Content className="modal-content">
            <Form className="form-inputs">
              <Form.Field className="form-inputs">
                <input
                  id="name"
                  placeholder="Name"
                  autoComplete="off"
                  autoCorrect="off"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Dropdown onChange={(e, data) => { this.setState({ selectCourse: data.value }) }} value={this.state.selectCourse} placeholder="Select Course Type" fluid selection options={this.state.courseOptions} />
              </Form.Field>
              <Form.Field className="form-inputs">
                <Input action>
                  <input
                    id="organization"
                    placeholder="0x0"
                    autoComplete="off"
                    autoCorrect="off"
                    value={this.state.organization}
                    onChange={this.handleChange}
                  />
                  <Button
                    type="button"
                    content="QR"
                    icon="qrcode"
                    onClick={() => this.setState({ scanQR: true })}
                  />
                </Input>
              </Form.Field>
              <Form.Field className="form-inputs">
                <Input action>
                  <input
                    id="score"
                    placeholder="Score"
                    autoComplete="off"
                    autoCorrect="off"
                    type="number"
                    min="1"
                    max="100"
                    disabled={this.state.isScoreInput}
                    value={this.state.score}
                    onChange={this.handleChange}
                  />
                  <div className="d-flex justify-content-center align-items-center">
                    <Label color={'dark'} className="black" key={'red'}>Enable Score</Label>
                    <Checkbox toggle onClick={(evt, data) => this.onChangeCheckbox(evt, data)} />
                  </div>
                </Input>
              </Form.Field>
              <Form.Field className="text-center">
                <Button type="button"
                  content="Upload Certificate Image"
                  icon="image"
                  onClick={() => this.setState({ imageUploadModal: true })} />
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
              onClick={() => this.props.closeCertificationModal()}
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
      </>
    );
  }
}
