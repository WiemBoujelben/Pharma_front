import { ethers } from "ethers";
const network = "testnet";

async function walletConnectFcn() {
  console.log(`\n=======================================`);

  // ETHERS PROVIDER
  const provider = new ethers.BrowserProvider(window.ethereum, "any");

  // SWITCH TO HEDERA TEST NETWORK
  console.log(`- Switching network to the Hedera ${network}...🟠`);
  let chainId;
  if (network === "testnet") {
    chainId = "0x128";
  } else if (network === "previewnet") {
    chainId = "0x129";
  } else {
    chainId = "0x127";
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainName: `Hedera ${network}`,
          chainId: chainId,
          nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 18 },
          rpcUrls: [`https://${network}.hashio.io/api`],
          blockExplorerUrls: [`https://hashscan.io/${network}/`],
        },
      ],
    });
    console.log("- Switched ✅");
  } catch (switchError) {
    console.error("Failed to switch network:", switchError);
    throw switchError;
  }

  // CONNECT TO ACCOUNT
  console.log("- Connecting wallet...🟠");
  let selectedAccount;
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    selectedAccount = accounts[0];
    console.log(`- Selected account: ${selectedAccount} ✅`);
  } catch (connectError) {
    console.error("Failed to connect wallet:", connectError);
    throw connectError;
  }

  return [selectedAccount, provider, network];
}

export default walletConnectFcn;