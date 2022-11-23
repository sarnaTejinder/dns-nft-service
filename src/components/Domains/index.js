import { useContext, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import MintContext from "../../contexts/MintContext";
import WalletContext from "../../contexts/WalletContext";
import Table from "react-bootstrap/Table";
import { TbExternalLink } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { BiSun, BiMoon } from "react-icons/bi";
import { HashLink } from "react-router-hash-link";

export default function Domains() {
  const { currentAccount } = useContext(WalletContext);
  const { mints, CONTRACT_ADDRESS, hasDomains, loading, setDraft, setEditing } =
    useContext(MintContext);

  const [darkMode, setDarkMode] = useState(true);
  return (
    <div
      style={{
        minHeight: "95vh",
        paddingTop: "10vh",
        paddingBottom: "5vh",
        scrollSnapAlign: "start",
      }}
      id="domains"
    >
      <span className="h2">Minted Domains</span>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
          marginBottom: "10vh",
        }}
      >
        {loading && <Loading />}
        {!loading && hasDomains && (
          <Container className="m-2">
            <div
              style={{
                float: "right",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                borderRadius: 10,
                position: "relative",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 26,
                  position: "absolute",
                  backgroundColor: "grey",
                  top: 0,
                  left: darkMode ? "50%" : "0%",
                  borderRadius: 10,

                  transition: "left 0.3s",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px 6px",
                  zIndex: 1000,
                  color: darkMode ? "black" : "white",
                  transition: "color 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setDarkMode(false)}
              >
                <BiSun />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px 6px",
                  zIndex: 1000,
                  color: darkMode ? "white" : "black",
                  transition: "color 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setDarkMode(true)}
              >
                <BiMoon />
              </div>
            </div>
          </Container>
        )}
        {!loading && hasDomains && (
          <Table
            striped
            bordered
            style={{
              borderRadius: 10,
              overflow: "hidden",
            }}
            hover
            variant={darkMode ? "dark" : "light"}
          >
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ textAlign: "center" }}>#</th>
                <th>Domain Name</th>
                <th>Record</th>
              </tr>
            </thead>
            <tbody>
              {mints.map((mint, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div
                        style={{
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="underlined">{mint.name}</span>
                        <a
                          className="link"
                          href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`}
                          target="_blank"
                          aria-label="opensea"
                          rel="noopener noreferrer"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            cursor: "pointer",
                            // backgroundColor: "red",
                            border: darkMode
                              ? "1px solid #e6e6e6"
                              : "1px solid #000",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                          }}
                        >
                          <TbExternalLink />
                        </a>
                      </div>
                    </td>
                    <td>
                      {/* If mint.owner is currentAccount, add an "edit" button*/}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span className="record">{mint.record || ""}</span>
                        {mint.owner.toLowerCase() ===
                        currentAccount.toLowerCase() ? (
                          <HashLink
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              // backgroundColor: "red",
                              border: darkMode
                                ? "1px solid #e6e6e6"
                                : "1px solid #000",
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              color: "inherit",
                            }}
                            to="#mint-form"
                            aria-label="Domain form"
                            onMouseDown={() => {
                              setDraft(mint);
                              setEditing(true);
                            }}
                          >
                            <FiEdit />
                          </HashLink>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        {!loading && !hasDomains && <p>No domains minted yet.</p>}
      </Container>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <Card body style={{ width: 250 }} className="loading">
        <span className="h5 text-muted">Loading Domains</span>
      </Card>
    </div>
  );
}
