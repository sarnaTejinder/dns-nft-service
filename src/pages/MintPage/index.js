import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Domains from "../../components/Domains";
import MintContext from "../../contexts/MintContext";
import WalletContext from "../../contexts/WalletContext";
import { animateScroll as scroll } from "react-scroll";

export default function MintPage() {
  const { currentAccount, errorStatus } = useContext(WalletContext);
  const history = useHistory();

  useEffect(() => {
    if (errorStatus !== -1 && !currentAccount) {
      history.replace("/");
    }
  }, [currentAccount, errorStatus, history]);

  return (
    <div
      style={{
        scrollSnapType: "y mandatory",
        maxHeight: "100vh",
        overflowY: "scroll",
        scrollbarWidth: "none",
        scrollbarColor: "transparent",
        scrollBehavior: "smooth",
      }}
    >
      <Container
        style={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          scrollSnapAlign: "start",
        }}
        id="mint-form"
      >
        <span className="h2">Mint New Domain</span>
        <DomainForm edit={false} />
      </Container>
      <Domains />
    </div>
  );
}

const DomainForm = () => {
  const {
    draft,
    setDraft,
    editing,
    setEditing,
    mintDomain,
    updateDomain,
    saving,
  } = useContext(MintContext);
  const [domainName, setDomainName] = useState(editing ? draft.name : "");
  const [data, setData] = useState(editing ? draft.record : "");
  const { hasDomains, loading } = useContext(MintContext);

  const isFormValid = useMemo(() => {
    return !(!domainName || domainName?.trim()?.length < 3);
  }, [domainName]);
  const history = useHistory();

  useEffect(() => {
    setDomainName(editing ? draft.name : "");
    setData(editing ? draft.record : "");
  }, [draft, editing]);

  const onSubmit = async () => {
    // editing
    //   ? await updateDomain({ domain: domainName.trim(), data: data.trim() })
    //   : await mintDomain({ domain: domainName.trim(), data: data.trim() });
    setDraft({ name: "", record: "" });
    setEditing(false);
  };

  return (
    <Container style={{ width: "50em" }}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter Domain Name"
          aria-label="Domain Name"
          aria-describedby="basic-addon2"
          value={domainName}
          onInput={(e) => setDomainName(e.target.value)}
        />
        <InputGroup.Text id="basic-addon2">.shine</InputGroup.Text>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Data</InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="Data"
          maxLength={256}
          placeholder="Qualities that make you shine"
          style={{ maxHeight: 100 }}
          value={data}
          onInput={(e) => setData(e.target.value)}
        />
      </InputGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HashLink to="#domains" onMouseDown={onSubmit}>
          <Button
            variant="primary"
            className="mt-3"
            disabled={!isFormValid || saving}
          >
            {editing ? "Save" : " Mint"}
          </Button>
        </HashLink>
        {!loading && hasDomains && (
          <HashLink className="btn btn-info mx-2 mt-3" to={"#domains"}>
            Minted Domains
          </HashLink>
        )}
      </div>
    </Container>
  );
};
