import { ethers } from "ethers";

async function walletConnectFcn() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed!");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = "testnet"; 
  const chainId = network === "testnet" ? "0x128" : "0x127"; // Hedera chain IDs

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId,
              chainName: `Hedera ${network}`,
              nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 18 },
              rpcUrls: [`https://${network}.hashio.io/api`],
              blockExplorerUrls: [`https://hashscan.io/${network}/`],
            },
          ],
        });
      } catch (addError) {
        throw new Error("Failed to add Hedera network: ${addError.message}");
      }
    } else {
      throw new Error("Failed to switch to Hedera: ${switchError.message}");
    }
  }

  // Connect wallet
  const accounts = await provider.send("eth_requestAccounts", []);
  if (!accounts[0]) throw new Error("No accounts found");

  return [accounts[0], provider, network];
}

export default walletConnectFcn;