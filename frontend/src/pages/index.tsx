import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { ContractUIForTagger } from "../components/ContractUIForTagger";
// const selectedContractStorageKey = "scaffoldEth2.selectedContract";
// const contractNames = getContractNames();

const Tag: NextPage = () => {
  //   variables about the tagger contract
  const [itemId, setItemId] = useState<string | null>("a16e3621-46e1-4734-9c98-247a16fe2efc");
  const [contractName, setContractName] = useState<string | null>("galxe-campaigns");

  const [data, setData] = useState("Aptos Easter Egg Hunt");
  const [metadata, setMetadata] = useState("{'unique_id':'GCsCXUpJqg','chain_name':'aptos'}");

//   const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
//     selectedContractStorageKey,
//     contractNames[0],
//   );

  function selectDataset(dataset_name: string) {
    switch (dataset_name) {
      case "bodhi-text-contents":
        return "bodhi_text_assets_k_v";
      case "bodhi":
        return "bodhi_text_assets_k_v";
      case "galxe-campaigns":
        return "galxe_campaigns";
      default:
        return "opps";
    }
  }

  async function getItem(uuid: string, dataset_name: string) {
    const dataset_name_finally = selectDataset(dataset_name);
    console.log("uuid", uuid);
    const response = await fetch("https://query-item.deno.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: uuid,
        dataset_name: dataset_name_finally,
      }),
      // mode: "no-cors",
    });
    const resp = await response.json();
    console.log("resp", resp);
    setData(resp[0].data);
    setMetadata(resp[0].metadata);
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    // const itemIdInUrl = queryParameters.get("item_id") as string;
    const itemIdInUrl = itemId as string;
    // let contractN = queryParameters.get("contract_name") as string;
    // if(contractN === "bodhi-text-contents") {
    //   contractN = "bodhi";
    // }
    // setItemId(itemIdInUrl);
    // setContractName(contractN);
    getItem(itemIdInUrl, contractName as string);
  }, []);

//   useEffect(() => {
//     if (!contractNames.includes(selectedContract)) {
//       setSelectedContract(contractNames[0]);
//     }
//   }, [selectedContract, setSelectedContract]);

  return (
    <>
      <div className="flex flex-col pt-20 mx-auto w-content font-poppins">
          <ContractUIForTagger
            key="GalaxeItemTagger"
            contractName="GalaxeItemTagger"
            itemId={itemId as string}
            content={data}
            metadata={metadata}
            className="GalaxeItemTagger"
          />
      </div>
    </>
  );
};

export default Tag;
