import React, { Component } from "react";
import { Image, Input, Loader } from "semantic-ui-react";
import "./ChatBody.css";
import { db } from "../firebase/firebase";
import GetInfoModal from "./GetInfoModal";

const senderDesign = {
  position: "relative",
  fontSize: "1rem",
  padding: "10px",
  backgroundColor: "#c5c6c7",
  color: "black",
  borderRadius: "10px",
  width: "fit-content",
  marginBottom: "23px",
  maxWidth: "60%",
  boxShadow: "inset 0 0 3px black",
};

const receiverDesign = {
  position: "relative",
  fontSize: "1rem",
  padding: "10px",
  backgroundColor: "rgba(0, 128, 128,.4)",
  borderRadius: "10px",
  width: "fit-content",
  marginBottom: "23px",
  marginLeft: "auto",
  color: "white",
  maxWidth: "60%",
  boxShadow: "inset 0 0 3px lightgray",
};

export default class ChatBody extends Component {
  state = {
    chats: [],
    loading: false,
    message: "",
    account: "",
    infomaodal: false,
    ind : 0
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    var key;
    const ethAddress = this.props.ethAddress;
    if (ethAddress < accounts[0]) {
      key = ethAddress + "#" + accounts[0];
    } else {
      key = accounts[0] + "#" + ethAddress;
    }
    await db
      .collection("chats")
      .doc(key)
      .collection("chatmessages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        this.setState({ chats: snapshot.docs.map((doc) => doc.data()) })
      );
    console.log(this.state.chats);
    this.setState({ loading: false });
  };

  sendMessage = async (e) => {
    e.preventDefault();
    const account = this.state.account;
    const ethAddress = this.props.ethAddress;
    var key;
    if (ethAddress < account) {
      key = ethAddress + "#" + account;
    } else {
      key = account + "#" + ethAddress;
    }
    await db.collection("chats").doc(key).collection("chatmessages").add({
      message: this.state.message,
      sender: account,
      receiver: ethAddress,
      timeStamp: new Date(),
    });
    this.setState({ message: "" });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") this.sendMessage(e);
  };

  closeInfoModal = async () => {
    this.setState({ infomaodal: false });
  };

  render() {
    return this.state.loading ? (
      <Loader active />
    ) : (
      <>
        <GetInfoModal
          isOpen={this.state.infomaodal}
          closeInfoModal={this.closeInfoModal}
          info={
            this.state.chats && this.state.chats.length >= 1
              ? this.state.chats[this.state.ind].info
              : {}
          }
          admin={this.props.admin}
          isEndorsementReq={this.props.isEndorsementReq}
          org={this.props.org}
        />
        <div style={{ marginTop: "7px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div>
              <Image
                src={this.props.avatar}
                avatar
                style={{ fontSize: "25px" }}
              />
              <span
                style={{
                  matginLeft: "10px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {this.props.name}
              </span>
            </div>
            <small
              style={{
                fontWeight: "600",
                wordBreak: "break-word",
                fontSize: "0.7rem",
                marginTop: "30px",
              }}
            >
              {this.props.ethAddress}
            </small>
          </div>
          <hr></hr>
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "auto",
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "10px",
              height: "61vh",
            }}
          >
            {this.state.chats?.map((chat, index) => {
              return (
                <p
                  key={index}
                  style={
                    this.state.account !== chat.sender
                      ? senderDesign
                      : receiverDesign
                  }
                >
                  {chat.sender !== "none" && (
                    <>
                      <div>
                        <b
                          style={{
                            color:
                              this.state.account !== chat.sender
                                ? "black"
                                : "lightgray",
                            fontSize: "10px",
                            marginBottom: "3px",
                            wordBreak: "break-word",
                          }}
                        >
                          {chat.sender}
                        </b>
                      </div>
                    </>
                  )}
                  <div style={{margin:"5px auto" }}>{chat.message}</div>
                  <div className="d-flex justify-content-end">
                  <small
                    style={{
                      color:
                        this.state.account !== chat.sender
                          ? "black"
                          : "lightgray",
                      fontSize: "10px",
                    }}
                  >
                    {new Date(chat.timeStamp?.toDate()).toUTCString()}
                  </small>
                  </div>
                  <div className="endrose-btn d-flex justify-content-center" style={{ color: "green",cursor:"pointer"}} 
                    onClick={() => this.setState({ infomaodal: true,ind :index })}>
                    {chat.message[0].toLowerCase()=='a' ? "Add Me..." : "Endorse Me..."
                    }
                    </div>
                </p>
              );
            })}
          </div>
        </div>
        <div
          style={{
            height: "50px",

            minWidth: "3rem",
          }}
        >
          <Input
            value={this.state.message}
            action={{
              color: "rgba(31, 30, 30, 0.581)",
              labelPosition: "right",
              icon: "send",
              content: "Send",
              onClick: (e) => this.sendMessage(e),
            }}
            onChange={(e) => this.setState({ message: e.target.value })}
            style={{
              width: "100%",
            }}
            placeholder="Enter text..."
            className="design-chat-input"
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </>
    );
  }
}
