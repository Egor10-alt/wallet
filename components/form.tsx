import { ChangeEvent, useState } from "react";
import style from "../styles/Home.module.css";
import { useDisconnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export const TransactionDataFrom = () => {
  const { sendTransaction } = useSendTransaction();
  const { disconnect } = useDisconnect();
  const [{address, tokenAmount}, setFormData] = useState({
    address: "",
    tokenAmount: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendTransaction({ to: address, value: parseEther(tokenAmount) });
    setFormData({
      address: "",
      tokenAmount: "",
    });
  }

  const disconnectWalletAddress = () => disconnect();

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={style['form-group']}>
          <label htmlFor="address">Address:</label>
          <input 
            type="text"
            id="address"
            name="address"
            placeholder="0xA0Cf…251e"
            onChange={handleChange}
            value={address}
            required
          />
        </div>
        <div className={style['form-group']}>
          <label htmlFor="tokenAmount">Amount:</label>
          <input
            type="text"
            id="tokenAmount"
            name="tokenAmount"
            placeholder="0.05"
            onChange={handleChange}
            value={tokenAmount}
            required
          />
        </div>
        <button className={style["submit-button"]} type="submit">Submit</button>
      </form>

      <div className={style['disconnect-button-container']}>
        <button className={style['disconnect-button']} onClick={disconnectWalletAddress}>Disconnect</button>
      </div>
    </>
    
  );
}