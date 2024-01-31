import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { myContractAbi } from '../constants';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { useCallback, useState } from 'react';

export const useSentERC20 = () => {
    const [to, setTo] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const setRecipientAddress = (recipient: string) => {
        setTo(recipient);
    };

    const setTransferAmount = (transferAmount: number) => {
        setAmount(transferAmount);
    };

    const sendERC20 = useCallback(async () => {
        try {
          const { request } = await prepareWriteContract({
            address: '0x8B88F5027909230121766e1591e5bAb1DfDA4b9f',
            abi: myContractAbi,
            functionName: 'transfer',
            args: [`0x${to}`, BigInt(amount)]
          });
          const { hash } = await writeContract(request);
          await waitForTransaction({
            hash,
          });
    
          setTo('');
          setAmount(0);
          
        } catch(err) {
          console.error('Error sending ERC20 token:', err);
        }
      }, [to, amount]);

    return {
        setRecipientAddress,
        setTransferAmount,
        sendERC20,
    };
}
