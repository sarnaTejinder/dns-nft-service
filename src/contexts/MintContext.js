import { ethers } from "ethers";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { networks } from "../utils/networks";
import WalletContext from "./WalletContext";
import contractABI from "../utils/contractABI.json";

const MintContext = createContext({});
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTACT_ADDRESS;

function handleChainChanged(_chainId) {
  window.location.reload();
}

export function MintProvider({ children }) {
  const { currentAccount, network, setNetwork } = useContext(WalletContext);
  const [mints, setMints] = useState([]);
  const [error, setError] = useState({ value: false });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState({ domain: "", data: "" });
  const [editing, setEditing] = useState(false);
  const { ethereum } = window;

  const mintDomain = async (props) => {
    setSaving(true);

    const { domain, data } = props;
    if (!domain) return;
    if (domain.length < 3 || !currentAccount) {
      setError({ value: true, status: "mint domain" });
      return;
    }
    try {
      if (ethereum) {
        const chainId = await ethereum.request({ method: "eth_chainId" });
        setNetwork(networks[chainId]);
        ethereum.on("chainChanged", handleChainChanged);

        // if(network !== "Polygon Mumbai Testnet") {
        //   alert("Switch To polygon");
        //   return;
        // }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );
        let price =
          domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";

        let txn = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        }); // calls contract's method =>  metamask pops up
        await txn.wait(); // waits for the transaction to be mined

        txn = await contract.attachDataToDomain(domain, data);
        await txn.wait();
        fetchMints();
      } else {
        setError({ value: true, status: "mint domain" });
      }
    } catch (error) {
      setError({ value: true, status: "mint domain" });
      console.log(error);
    }
    setSaving(false);
  };

  const updateDomain = async (props) => {
    const { domain, data } = props;
    if (!data || !domain) {
      return;
    }
    setSaving(true);

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );

        let tx = await contract.attachDataToDomain(domain.split(".")[0], data);
        await tx.wait();
        fetchMints();
      }
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  };

  const fetchMints = useCallback(async () => {
    setLoading(true);
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );

        const names = await contract.getAllNames();

        const mintRecords = await Promise.all(
          names.map(async (name) => {
            let name1 = name.split(".")[0];
            //const mintRecord = await contract.getData(name);
            const mintRecord = await contract.records(name1);
            const owner = await contract.domains(name1);
            return {
              id: names.indexOf(name),
              name: name,
              record: mintRecord,
              owner: owner,
            };
          })
        );
        const reversedArray = mintRecords?.reverse();
        setMints(reversedArray);
      }
    } catch (error) {
      setError({ value: true, status: "mint fetch" });
      console.error(error);
    }
    setLoading(false);
  }, [ethereum]);

  useEffect(() => {
    if (currentAccount && network === "Polygon Mumbai Testnet") {
      fetchMints();
    }
  }, [fetchMints, currentAccount, network]);

  return (
    <MintContext.Provider
      value={{
        mints,
        mintDomain,
        updateDomain,
        fetchMints,
        loading,
        error,
        hasDomains: mints.length > 0,
        CONTRACT_ADDRESS,
        draft,
        setDraft,
        editing,
        setEditing,
        saving,
      }}
    >
      {children}
    </MintContext.Provider>
  );
}

export default MintContext;
