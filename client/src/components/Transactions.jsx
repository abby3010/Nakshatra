import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({ link,
    originator,
    source,
    message,
    timestamp,
    url,
    keyword }) => {

    // Fetch the gif url associated with the keyword.
    const gifUrl = useFetch({ keyword });

    return (
        <div className="bg-[#181918] m-4 flex flex-1
        2xl-min-w-[450px]
        2xl-max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/0xfadc28597bdbfe9a86793c7253a9954460eaf964`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Link: {link}</p>
                    </a>
                    <p className="text-white text-base">Originator: {originator.slice(0, 5)}...{originator.slice(-5)}</p>
                    <p className="text-white text-base">Source: {source}</p>
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}

                </div>
                {/* Gif image related to the transaction */}
                <img
                    alt="fun-gif"
                    src={gifUrl || url}
                    className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                />
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>


            </div>
        </div>
    );
}


const Transactions = () => {
    const { currentAccount, transactions } = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Transaction
                    </h3>
                ) :
                    (
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect your Metamask wallet to see the latest links added!
                        </h3>
                    )}

                <div className="flex flex-wrap justify-center items-center mt-10 ">
                    {transactions.reverse().map((transaction, index) => (<TransactionCard key={index} {...transaction} />))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;