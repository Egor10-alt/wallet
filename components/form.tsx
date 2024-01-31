import { ChangeEvent, useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import { useDisconnect } from "wagmi";
import { useSentERC20 } from "../hooks/useSentERC20";

type TFormTransactionData = {
  address: string,
  tokenAmount: number,
}

export const TransactionDataFrom = () => {
  const { disconnect } = useDisconnect();
  const [{address, tokenAmount}, setFormData] = useState<TFormTransactionData>({
    address: "",
    tokenAmount: 0,
  });
  
  const { setRecipientAddress, setTransferAmount, sendERC20 } = useSentERC20();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendERC20();

    setFormData({
      address: "",
      tokenAmount: 0,
    });
  }

  const disconnectWalletAddress = () => disconnect();

  useEffect(() => {
    setRecipientAddress(address);
    setTransferAmount(tokenAmount);
  }, [address, tokenAmount, setRecipientAddress, setTransferAmount])

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
            type="number"
            id="tokenAmount"
            name="tokenAmount"
            onChange={handleChange}
            value={tokenAmount}
            min={0}
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