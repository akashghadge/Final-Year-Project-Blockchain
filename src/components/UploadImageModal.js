import React, { useRef, useState } from "react";
import "./Modals.css";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function UploadImageModal(props) {
    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    function handleChange(e) {
        setImgUrl(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }
    function submitImage() {
        props.uploadSubmitImage(file);
    }
    return (
        <Modal size="tiny" className="modal-des" open={props?.isOpen}>
            <Header
                className="modal-heading"
                icon="qrcode"
                content="Upload Image"
                as="h2"
            />
            <Modal.Content className="modal-content pos-middle-qr">
                <div
                    style={{
                        width: "200px",
                        height: "200px",
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "20px",
                        marginBottom: "10px",
                    }}
                >
                    <img src={imgUrl} width="200px" height="200px"></img>
                </div>
                <input id="dpp" type="file" accept="image/*" onChange={handleChange} hidden />
                <Button>
                    <label class="cameraParent" for="dpp" title="Select to choose Photo">
                        upload image
                    </label>
                </Button>
            </Modal.Content>
            <Modal.Actions className="modal-actions">
                <Button
                    className="close-button"
                    type="button"
                    color="red"
                    icon="times"
                    content="Close"
                    onClick={() => props?.closeImageModal()}
                />
                <Button
                    className="submit-button"
                    type="button"
                    color="green"
                    content="Submit"
                    onClick={() => submitImage()}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default UploadImageModal;
