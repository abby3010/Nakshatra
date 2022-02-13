import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";

const Link = () => {
    const { slug } = useParams();

    const { transactions, transactionCount } = useContext(TransactionContext);
    console.log(transactions)
    const [transaction, setTransaction] = useState();

    useEffect(() => {

        if (transactions.length > 0) {
            const trans = transactions.find(transaction => transaction.slug === slug);
            setTransaction(trans);
        }
    }, [transactions]);

    const InfoCard = ({ color, title, icon, subtitle }) => {
        return (
            <div className="w-[90%] md:w-[40%] flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
                {icon && <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
                    {icon}
                </div>}
                <div className="flex flex-col ml-5">
                    <h1 className="mt-2 text-white text-lg ">{title}</h1>
                    <h1 className="mt-2 text-white text-sm break-all">{subtitle}</h1>
                </div>
            </div>
        );
    }


    return (

        <div className="flex flex-col w-full justify-center items-center">

            {transaction && (
                <div className="flex-1 w-full flex  flex-col justify-start items-center">
                    <InfoCard
                        color="bg-[#2952e3]"
                        title="Link"
                        subtitle={<a href={transaction.link} target="_blank" className="text-blue-600">{transaction.link}</a>}
                    />
                    <InfoCard
                        color="bg-[#2952e3]"
                        title="Originator"
                        subtitle={transaction.originator}
                    />
                    <InfoCard
                        color="bg-[#2952e3]"
                        title="Source"
                        subtitle={transaction.source}
                    />

                    <InfoCard
                        color="bg-[#2952e3]"
                        title="Description/Message"
                        subtitle={transaction.message}
                    />
                    <InfoCard
                        color="bg-[#2952e3]"
                        title="Link"
                        subtitle={transaction.timestamp}
                    />
                </div>
            )}
        </div>
    )
}

export default Link;