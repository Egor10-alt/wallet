import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { TransactionDataFrom } from '../components/form';
import { useAccount } from 'wagmi';
import { useIsMounted } from "../hooks/useIsMounted";
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {isMounted && isConnected ?  <TransactionDataFrom /> : <ConnectButton />}
      </main>
    </div>
  );
};

export default Home;
