import React, { Component } from "react";
import { Segment, Button, Image } from "semantic-ui-react";

export default class MetaMaskGuide extends Component {
  render() {
    return (
      <Segment
        placeholder
        textAlign="center"
        style={{
          alignSelf: "center",
          justifySelf: "center",
          maxWidth: "800px",
          margin: "100px auto",
          color: "white",
          background:"transparent"
        }}
      >
        <Image
          src="https://cdn.worldvectorlogo.com/logos/metamask.svg"
          width="200px"
          centered
        />

        <h1>Oops!.. Seems like you do not have metamask extension.</h1>
        <h2>Please download it to proceed.</h2>
        <p>
          After the metamask set-up , create an account on <b>Goerli or Sepolia</b> test
          network.
        </p>
        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
          <Button color="ui green button">Download Metamask Extension</Button>
        </a>
      </Segment>
    );
  }
}
