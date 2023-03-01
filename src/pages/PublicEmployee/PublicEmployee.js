import React, { Component } from "react";
import { toast } from "react-toastify";
import { Card, Grid, Button } from "semantic-ui-react";
import Admin from "../../abis/Admin.json";
import Employee from "../../abis/Employee.json";
import LineChart from "../../components/LineChart";
import SkillCard from "../../components/SkillCard";
import "../Employee/Employee.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import CodeforcesGraph from "../../components/CodeforcesGraph";
import LoadComp from "../../components/LoadComp";
import GenerateCertificateModal from "../../components/GenerateCertificateModal";

export default class EmployeePage extends Component {
    state = {
        validAddress: true,
        employeedata: {},
        overallEndorsement: [],
        skills: [],
        certifications: [],
        workExps: [],
        colour: ["#b6e498", "#61dafb", "#764abc", "#83cd29", "#00d1b2"],
        readmore: false,
        codeforces_res: [],
        loadcomp: false,
        codeforces_username: "darshanahire",
        isOpenGenerateCertificateModal: false,
        selectedCertificate: {},
        isCertificateModal: true
    };

    componentDidMount = async () => {
        const { account } = this.props.match.params;
        const web3 = window.web3;
        if (!web3.utils.isAddress(account)) {
            this.setState({ validAddress: false });
            return;
        }
        this.setState({ loadcomp: true });
        const networkId = await web3.eth.net.getId();
        const AdminData = await Admin.networks[networkId];
        if (AdminData) {
            const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
            const employeeContractAddress = await admin?.methods
                ?.getEmployeeContractByAddress(account)
                .call();
            const EmployeeContract = await new web3.eth.Contract(
                Employee.abi,
                employeeContractAddress
            );
            this.getSkills(EmployeeContract);
            this.getCertifications(EmployeeContract);
            this.getWorkExp(EmployeeContract);
            const cfUsername = await EmployeeContract.methods.getCodeforcesUsername().call();
            this.setState({ codeforces_username: cfUsername });
            const employeedata = await EmployeeContract.methods
                .getEmployeeInfo()
                .call();
            const newEmployedata = {
                ethAddress: employeedata[0],
                name: employeedata[1],
                location: employeedata[2],
                description: employeedata[3],
                overallEndorsement: employeedata[4],
                endorsecount: employeedata[5],
            };
            const endorseCount = newEmployedata.endorsecount;
            const overallEndorsement = await Promise.all(
                Array(parseInt(endorseCount))
                    .fill()
                    .map((ele, index) =>
                        EmployeeContract?.methods?.overallEndorsement(index).call()
                    )
            );

            this.setState({ employeedata: newEmployedata, overallEndorsement });
        } else {
            toast.error("The Admin Contract does not exist on this network!");
        }
        this.setState({ loadcomp: false });
    };

    getSkills = async (EmployeeContract) => {
        const skillCount = await EmployeeContract?.methods?.getSkillCount().call();
        const skills = await Promise.all(
            Array(parseInt(skillCount))
                .fill()
                .map((ele, index) =>
                    EmployeeContract?.methods?.getSkillByIndex(index).call()
                )
        );

        var newskills = [];
        skills.forEach((certi) => {
            newskills.push({
                name: certi[0],
                overall_percentage: certi[1],
                experience: certi[2],
                endorsed: certi[3],
                endorser_address: certi[4],
                review: certi[5],
                visible: certi[6],
            });
            return;
        });

        this.setState({ skills: newskills });
    };

    getCertifications = async (EmployeeContract) => {
        const certiCount = await EmployeeContract?.methods
            ?.getCertificationCount()
            .call();
        const certifications = await Promise.all(
            Array(parseInt(certiCount))
                .fill()
                .map((ele, index) =>
                    EmployeeContract?.methods?.getCertificationByIndex(index).call()
                )
        );
        var newcertifications = [];
        certifications.forEach((certi) => {
            newcertifications.push({
                name: certi[0],
                organization: certi[1],
                score: certi[2],
                endorsed: certi[3],
                visible: certi[4],
                isScored: certi[5],
                certificate_type: certi[6],
                certificate_url: certi[7],
            });
            return;
        });
        this.setState({ certifications: newcertifications });
    };

    getWorkExp = async (EmployeeContract) => {
        const workExpCount = await EmployeeContract?.methods
            ?.getWorkExpCount()
            .call();
        const workExps = await Promise.all(
            Array(parseInt(workExpCount))
                .fill()
                .map((ele, index) =>
                    EmployeeContract?.methods?.getWorkExpByIndex(index).call()
                )
        );

        var newworkExps = [];
        workExps.forEach((work) => {
            newworkExps.push({
                role: work[0],
                organization: work[1],
                startdate: work[2],
                enddate: work[3],
                endorsed: work[4],
                description: work[5],
                visible: work[6],
            });
            return;
        });

        this.setState({ workExps: newworkExps });
    };

    openGenerateCertificateModal = (type, d) => {
        this.setState({ selectedCertificate: d });
        this.setState({ isCertificateModal: !type })
        this.setState({ isOpenGenerateCertificateModal: !this.state.isOpenGenerateCertificateModal });
    }
    closeGenerateCertificateModal = (d) => {
        this.setState({ isOpenGenerateCertificateModal: !this.state.isOpenGenerateCertificateModal });
    }
    render() {
        return this.state.loadcomp ? (
            <LoadComp />
        ) : (
            this.state.validAddress ?
                <>
                    <GenerateCertificateModal
                        isOpen={this.state.isOpenGenerateCertificateModal}
                        closeModal={this.closeGenerateCertificateModal}
                        certificateDetails={this.state.selectedCertificate}
                        employee={this.state.employeedata}
                        isCertificateModal={this.state.isCertificateModal}
                    />
                    <div className="container-xl employeeProfile">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Card className="personal-info">
                                        <Card.Content>
                                            <Card.Header>
                                                {this.state.employeedata?.name}
                                                <small
                                                    style={{ wordBreak: "break-word", color: "#c5c6c7" }}
                                                >
                                                    {this.state.employeedata?.ethAddress}
                                                </small>
                                            </Card.Header>
                                            <br />
                                            <div>
                                                <p>
                                                    <em>Location: </em>
                                                    <span style={{ color: "#c5c6c7" }}>
                                                        {this.state.employeedata?.location}
                                                    </span>
                                                </p>
                                            </div>
                                            <br />
                                            <div>
                                                <p>
                                                    <em>Overall Endorsement Rating:</em>
                                                </p>
                                                <LineChart
                                                    overallEndorsement={this.state.overallEndorsement}
                                                />
                                            </div>
                                        </Card.Content>
                                    </Card>
                                    <Card className="employee-des">
                                        <Card.Content>
                                            <Card.Header>Competetive Platform Ratings</Card.Header>
                                            <CodeforcesGraph codeforces_username={this.state.codeforces_username} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Card className="employee-des">
                                        <Card.Content>
                                            <Card.Header>Certifications</Card.Header>
                                            <br />
                                            <div>
                                                {this.state.certifications?.map(
                                                    (certi, index) =>
                                                        certi.visible && (
                                                            <div key={index} className="certification-container">
                                                                <div style={{ color: "#c5c6c7" }}>
                                                                    <p>{certi.name}</p>
                                                                    <small style={{ wordBreak: "break-word" }}>
                                                                        {certi.organization}
                                                                    </small>
                                                                    <p
                                                                        style={{
                                                                            color: certi.endorsed ? "#00d1b2" : "yellow",
                                                                            opacity: "0.7",
                                                                        }}
                                                                    >
                                                                        {certi.endorsed
                                                                            ? "Endorsed"
                                                                            : "Not Yet Endorsed"}
                                                                    </p>
                                                                    <Button onClick={this.openGenerateCertificateModal.bind(this, 0, certi)} disabled={!certi.endorsed}>
                                                                        Show Certificate
                                                                    </Button>
                                                                </div>
                                                                <div>
                                                                    <div style={{ width: "100px" }}>
                                                                        <CircularProgressbar
                                                                            value={certi.score}
                                                                            text={`Score - ${certi.score}%`}
                                                                            strokeWidth="5"
                                                                            styles={buildStyles({
                                                                                strokeLinecap: "round",
                                                                                textSize: "12px",
                                                                                pathTransitionDuration: 1,
                                                                                pathColor: `rgba(255,255,255, ${certi.score / 100
                                                                                    })`,
                                                                                textColor: "#c5c6c7",
                                                                                trailColor: "#393b3fa6",
                                                                                backgroundColor: "#c5c6c7",
                                                                            })}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                )}
                                            </div>
                                        </Card.Content>
                                    </Card>
                                    <Card className="employee-des">
                                        <Card.Content>
                                            <Card.Header>Work Experiences</Card.Header>
                                            <br />
                                            <div className="education">
                                                {this.state.workExps?.map(
                                                    (workExp, index) =>
                                                        workExp.visible && (
                                                            <>
                                                                <div className="education-design" key={index}>
                                                                    <div style={{ color: "#c5c6c7" }}>
                                                                        <p>{workExp.role}</p>
                                                                        <small style={{ wordBreak: "break-word" }}>
                                                                            {workExp.organization}
                                                                        </small>
                                                                    </div>
                                                                    <div>
                                                                        <small>
                                                                            <em>
                                                                                {workExp.startdate} - {workExp.enddate}
                                                                            </em>
                                                                        </small>
                                                                        <p
                                                                            style={{
                                                                                color: workExp.endorsed
                                                                                    ? "#00d1b2"
                                                                                    : "yellow",
                                                                                opacity: "0.7",
                                                                            }}
                                                                        >
                                                                            {workExp.endorsed
                                                                                ? "Endorsed"
                                                                                : "Not Yet Endorsed"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Button className="ml-2" onClick={this.openGenerateCertificateModal.bind(this, 1, workExp)} disabled={!workExp.endorsed}>
                                                                    Show Work Exp
                                                                </Button>
                                                            </>
                                                        )
                                                )}
                                            </div>
                                        </Card.Content>
                                    </Card>
                                    <Card className="employee-des">
                                        <Card.Content>
                                            <Card.Header>Skills</Card.Header>
                                            <br />
                                            <div className="skill-height-container">
                                                {this.state.skills?.map((skill, index) =>
                                                    skill.visible ? (
                                                        <div>
                                                            <SkillCard skill={skill} key={index} />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )
                                                )}
                                            </div>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </> :
                <div className="container-xl employeeProfile">
                    <h1>Please Enter valid Ethereum Address...</h1>
                </div>
        );
    }
}
