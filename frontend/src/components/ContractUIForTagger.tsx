import { useEffect, useReducer, useState } from "react";
// import { ContractVariables } from "./ContractVariables";
// import { parseEther } from "viem";
// import { GradientBorderButton } from "./GradientBorderButton";
import { SvgClose } from "./svg/Close";
import { useWallet } from '@manahippo/aptos-wallet-adapter'; // 连接 Aptos 钱包
import { DAPP_NAME, DAPP_ADDRESS, APTOS_FAUCET_URL, APTOS_NODE_URL, MODULE_URL } from '../config/constants';


type ContractUIProps = {
  // contractName: ContractName;
  contractName: string;
  className?: string;
  itemId: string;
  content: string;
  metadata: string;
};

/**
 * UI component to interact with deployed contracts.
 * TODO: Bodhi should be specific.
 **/

export const ContractUIForTagger = ({
  contractName = "galxe-campaigns",
  itemId = "a16e3621-46e1-4734-9c98-247a16fe2efc",
  content = "Aptos Chain 3 YA NFT",
  metadata = "",
  className = "",
}: ContractUIProps) => {
  // const [refreshDisplayVariables] = useReducer(value => !value, false);
  // const configuredNetwork = getTargetNetwork();
  const configuredNetwork = {
    name: "Devnet"
  };

  // const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const deployedContractData = {
    address: "0x6fC...C2f4",
    balance: "5 APT"
  }

  // 输入框中的 tag
  const [tag, setTag] = useState<string>("");
  // 标记 tagJson 是否已经设置，已设置才调用 writeAsync
  const [isTagSet, setIsTagSet] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  // writeAsync 的参数，保存规范化后的 tag 列表
  const [tagJson, setTagJson] = useState("");

  const { account, signAndSubmitTransaction } = useWallet(); // 钱包签名相关函数

  async function init_did() {
    await signAndSubmitTransaction(do_init_did(), { gas_unit_price: 100 }).then(() => {
      setTimeout(get_services, 3000);
    });
  }

  useEffect(() => {
    if (isTagSet) {
      // writeAsync();
      submit()
    }
  }, [isTagSet]);

  /* smart contract interactor */
  // const { writeAsync } = useScaffoldContractWrite({
  //   contractName: contractName,
  //   functionName: "tagItem",
  //   args: [itemId, tagJson],
  //   value: parseEther("0"),
  //   blockConfirmations: 1,
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("Transaction blockHash", txnReceipt.blockHash);
  //     setIsTagSet(false);
  //   },
  // });

  const tagItem = () => {
    // iterate over tags to build json with format: { keyword_1: tagName_1, keyword_2: tagName_2, ... }
    const tempTagJson: { [key: string]: string } = {};
    tags.forEach((tag, index) => {
      tempTagJson[`keyword_${index + 1}`] = tag;
    });
    setTagJson(JSON.stringify(tempTagJson));
    setIsTagSet(true);
  };

  const addToTags = () => {
    if (!tag) {
      return;
    }

    setTags([tag, ...tags]);
    setTag("");
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const [addAddrInput, setAddAddrInput] = useState<{
    did_type: number;
    description: string;
    resource_path: string;
    addr_type: number;
    addr: string;
    pubkey: string;
    addr_description: string;
    chains: Array<string>;
    expired_at: number;
  }>({
    did_type: 0,
    description: '',
    resource_path: '',
    addr_type: 0,
    addr: '',
    pubkey: '',
    addr_description: '',
    chains: [],
    expired_at: 0,
  });

  function do_submit() {
    const { description, resource_path, addr_type, addr, pubkey, addr_description, chains } = addAddrInput;
    return {
      type: 'entry_function_payload',
      function: DAPP_ADDRESS + '::tagger::tag',
      type_arguments: [],
      arguments: [0, description],
    };
  }

  async function submit() {
    await signAndSubmitTransaction(do_submit(), { gas_unit_price: 100 });
  }

  return (
    <>
      <div className={`w-full flex space-x-10 ${className}`}>
        {/* 左侧栏 */}
        <div className="flex flex-col space-y-6 w-card shrink-0">
          {/* 第一个卡片 */}
          <div className="left-card flex flex-col p-2.5 space-y-1 bg-white shadow-card rounded-2xl dark:bg-dark-deep dark:shadow-none">
            <span className="text-sm font-bold text-dark-gray3">{contractName}</span>
            {/* <Address address={deployedContractData.address} size="xs" /> */}
            <div>{deployedContractData.address}</div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-normal text-light-gray dark:text-dark-gray">Balance:</span>
              {/* <Balance
              address={deployedContractData.address}
              className="space-x-1 text-sm font-semibold text-dark2 dark:text-dark3"
            /> */}
              <div>{deployedContractData.balance}</div>
            </div>
            {configuredNetwork && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-normal text-light-gray dark:text-dark-gray">Network:</span>
                <span className="text-sm font-semibold text-dark2 dark:text-dark3">{configuredNetwork.name}</span>
              </div>
            )}
          </div>
          {/* 第二个卡片 */}
          <div className="left-card flex flex-col p-2.5 space-y-1 bg-white bg-card shadow-card rounded-2xl dark:bg-dark dark:shadow-none">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="text-sm break-all text-dark-gray3 dark:text-dark-gray">chairperson</div>
              </div>
              <div className="sub-content">
                0x9Fd...Cac5
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="text-sm break-all text-dark-gray3 dark:text-dark-gray">judgeIndex</div>
              </div>
              <div className="sub-content">
                0
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="text-sm break-all text-dark-gray3 dark:text-dark-gray">tagFormat</div>
              </div>
              <div className="items-center space-x-1 sub-content">
                {"{'keyword_1': 'keyword_1','keyword_2':'keyword_2','keyword_3':'keyword_3','keyword_4':'keyword_4','keyword_5':'keyword_5'}"}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="text-sm break-all text-dark-gray3 dark:text-dark-gray">tagIndex</div>
              </div>
              <div className="items-center space-x-1 sub-content">
                7
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="text-sm break-all text-dark-gray3 dark:text-dark-gray">vectorDescription</div>
              </div>
              <div className="items-center space-x-1 sub-content">
                "the first tagger contract for galxe on Aptos Chain."
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <div className="text-sm break-all text-dark-gray3 dark:text-dark-gray">vectorName</div>
              </div>
              <div className="items-center space-x-1 sub-content">
                "galxe"
              </div>
            </div>
          </div>
        </div>
        {/* 中间主要区域 */}
        <div className="flex flex-col w-full space-y-9">
          <div className="flex flex-col p-8 space-y-2 text-xl font-medium bg-white rounded-2xl dark:bg-dark-deep dark:text-white">
            <span className="flex items-center space-x-2">
              <span className="font-semibold">Tag:</span>
              <span>{itemId}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="font-semibold">Content:</span>
              {/* <span>{content}</span> */}
              <span>Aptos Chain 3 YA NFT</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="font-semibold">Metadata Default:</span>
            </span>
            <span className="flex items-center space-x-2">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Key</th>
                    <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(metadata).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>{key}</td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {key == 'chain_name' ? "APTOS" : (typeof value === "object" ? JSON.stringify(value) : value)}
                        {/* {typeof value === "object" ? JSON.stringify(value) : value} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </span>
          </div>
          <div className="flex flex-col p-8 space-y-4 bg-white pr-36 rounded-2xl dark:bg-dark-deep">
            <span className="font-semibold text-dark-gray3">tagItem</span>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={tag}
                onChange={e => {
                  setTag(e.target.value);
                }}
                placeholder="Enter your text"
                className="px-4 py-2 text-sm font-semibold w-96 bg-gray focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-dark dark:text-dark3"
              />
              <button 
                onClick={addToTags}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm font-medium rounded-full cursor-pointer">
              Add
              </button>
              <button 
                onClick={tagItem}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm font-medium rounded-full cursor-pointer">
              Submit
              </button>
              {/* <GradientBorderButton onClick={tagItem} btnText="Submit" smallSize={true} /> */}
            </div>
            <div className="flex flex-wrap bg-hlt items-center gap-2 p-4 pb-12 rounded bg-card dark:bg-[#1B1B1B]">
              {tags.map((tag, index) => (
                <span
                  className="flex bg-card2 items-center px-4 py-2 space-x-2 text-sm font-medium text-white rounded-full bg-gradFrom dark:text-dark"
                  key={index}
                >
                  <span>{tag}</span>
                  <SvgClose className="cursor-pointer dark:text-dark" onClick={() => removeTag(index)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div></>
  );
};
