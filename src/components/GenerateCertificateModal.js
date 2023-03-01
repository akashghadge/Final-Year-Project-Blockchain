import React, { useEffect, useState } from "react";
import "./Modals.css";
import { Button, Header, Modal } from "semantic-ui-react";
import "./GenerateCertificate.css"
import logo from "../logo.svg"
function GenerateCertificateModal(props) {
    useEffect(() => {
        console.log(props.certificateDetails);
    }, [props])
    return (
        <Modal size="large" className="modal-des" open={props?.isOpen}>
            <Modal.Content>
                <div className="container pm-certificate-container">
                    <div className="outer-border"></div>
                    <div className="inner-border"></div>
                    <div className="pm-certificate-border col-xs-12">
                        <div className="row pm-certificate-header">
                            <div className="custom-logo-container">
                                <img src={logo} height="150px" width="150px"></img>
                            </div>
                            <div className="pm-certificate-title cursive col-xs-12 text-center">
                                <h2>Organization name</h2>
                            </div>
                        </div>
                        <div className="row pm-certificate-body">
                            <div className="pm-certificate-block">
                                <div className="col-xs-12">
                                    <div className="row">
                                        <div className="col-xs-2"></div>
                                        <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                                            <span className="pm-name-text bold">{props.employee.name}</span>
                                        </div>
                                        <div className="col-xs-2"></div>
                                    </div>
                                </div>
                                {/* if we are showing the certificate */}
                                {
                                    props.isCertificateModal ?
                                        <>
                                            {
                                                props.certificateDetails.isScored ?
                                                    <>
                                                        <div className="col-xs-12">
                                                            <div className="row">
                                                                <div className="col-xs-2"></div>
                                                                <div className="pm-earned col-xs-8 text-center">
                                                                    <span className="pm-earned-text padding-0 block cursive">has earned</span>
                                                                    <span className="pm-credits-text block bold sans">{props.certificateDetails.score}</span>
                                                                </div>
                                                                <div className="col-xs-2"></div>
                                                                <div className="col-xs-12"></div>
                                                            </div>
                                                        </div>
                                                    </> : null
                                            }
                                            <div className="col-xs-12">
                                                <div className="row">
                                                    <div className="col-xs-2"></div>
                                                    <div className="pm-course-title col-xs-8 text-center">
                                                        <span className="pm-earned-text block cursive">while completing the training course entitled</span>
                                                    </div>
                                                    <div className="col-xs-2"></div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="row">
                                                    <div className="col-xs-2"></div>
                                                    <div className="pm-course-title underline col-xs-8 text-center">
                                                        <span className="pm-credits-text block bold sans">{props.certificateDetails.name} [{props.certificateDetails.certificate_type}]</span>
                                                    </div>
                                                    <div className="col-xs-2"></div>
                                                </div>
                                            </div>
                                        </> :
                                        <>
                                            <div className="col-xs-12">
                                                <div className="row">
                                                    <div className="col-xs-2"></div>
                                                    <div className="pm-earned col-xs-8 text-center">
                                                        <span className="pm-earned-text padding-0 block cursive">Worked for the role of</span>
                                                        <span className="pm-credits-text block bold sans">{props.certificateDetails.role}</span>
                                                    </div>
                                                    <div className="col-xs-2"></div>
                                                    <div className="col-xs-12"></div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="row">
                                                    <div className="col-xs-2"></div>
                                                    <div className="pm-course-title col-xs-8 text-center">
                                                        <span className="pm-earned-text block cursive">Duration of</span>
                                                    </div>
                                                    <div className="col-xs-2"></div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="row">
                                                    <div className="col-xs-2"></div>
                                                    <div className="pm-course-title underline col-xs-8 text-center">
                                                        <span className="pm-credits-text block bold sans">{props.certificateDetails.startdate} to {props.certificateDetails.enddate} </span>
                                                    </div>
                                                    <div className="col-xs-2"></div>
                                                </div>
                                            </div>
                                        </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Content>
            <Modal.Actions className="modal-actions">
                <Button
                    className="close-button"
                    type="button"
                    color="red"
                    icon="times"
                    content="Close"
                    onClick={() => props?.closeModal()}
                />
            </Modal.Actions>
        </Modal >
    );
}

export default GenerateCertificateModal;
