import { useEffect } from 'react';
import {
    useCryptoPrices
} from "react-realtime-crypto-prices";

type Props = {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}

const RealTimeCryptoPrice = (props: Props) => {
    const { amount, setAmount } = props;
    let prices = useCryptoPrices(["eth"]);
    let priceInfo = JSON.stringify(prices);
    let ethPrice = JSON.parse(priceInfo)['eth'];
    let total = ethPrice ? amount * ethPrice : 0;

    useEffect(() => {
        setAmount(0);
    }, []);
    
    return (
        <>
            <div>{`${amount} ETH =$ ${total.toFixed(2)}USD`}</div>
        </>
    );
};

export default RealTimeCryptoPrice;