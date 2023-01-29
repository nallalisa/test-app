import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { sign } from "tweetnacl";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
  const [message, setMessage] = useState("");
  const [validate, setValidate] = useState("");

  const { publicKey, signMessage } = useWallet();

  async function signIt() {
    if (!signMessage) {
      console.log("signMessage not defined yet");
      return;
    }

    const msg = await signMessage(Buffer.from(message));
    const decoded = Buffer.from(msg).toString("base64");
    console.log({ decoded });
  }

  function checkSign() {
    const m = Buffer.from(message);
    const v = Buffer.from(validate, "base64");
    const p = publicKey?.toBuffer();

    const isVerified = sign.detached.verify(m, v, p);
    console.log({ isVerified });
  }

  return (
    <div style={{ margin: 20 }}>
      <WalletMultiButton />

      {publicKey ? (
        <>
          <div>
            <p>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button onClick={signIt}>Sign!</button>
            </p>

            <p>
              <input
                type="text"
                value={validate}
                onChange={(e) => setValidate(e.target.value)}
              />

              <button onClick={checkSign}>Validate!</button>
            </p>
          </div>
        </>
      ) : (
        <p>Connect wallet to sign!</p>
      )}
    </div>
  );
}
