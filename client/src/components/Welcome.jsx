import React, { useContext } from 'react';
import { AiFillAlipayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-300 text-sm font-light text-white';

const Welcome = () => {

    const { connectWallet, currentAccount } = useContext(TransactionContext);

    const Input = ({ placeholder, name, type, value, handleChange }) => {
        return (
            <input
                className="w-full my-2 rounded-md p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                type="text"
                placeholder={placeholder}
                step="0.0001"
                value={value}
                onChange={(e) => handleChange(e, name)}
            />
        );
    }


    const handleSubmit = () => {

    }

    return (
        <div className="flex w-full justify-center items-cemter">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        One Stop <br /> for Secure Links
                    </h1>
                    <p className="text-left text-white mt-5 font-light md:w-9/12 w-11/12 text-base">
                        Explore the blockchain world. Share and Open links securely on <span className="font-bold">LinkCrypt</span>.
                    </p>
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                            <p className="text-white text-base text-semibold">Connect Wallet</p>
                        </button>
                    )}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Decentralized
                        </div>
                        <div className={`${commonStyles}`}>
                            Secure
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Easy to use
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Open Source
                        </div>
                        <div className={`${commonStyles}`}>
                            Free
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 justify-start items-center w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize="21" color="white" />
                                </div>
                                <BsInfoCircle fontSize="18" color="white" />
                            </div>
                            <div>

                                <p className="text-white font-light text-sm" >
                                    0xlanjd.....askdjn
                                </p>
                                <p className="text-white font-semibold text-lg mt-1" >
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Originator" type="text" name="originator" handleChange={() => { }} />
                        <Input placeholder="Source" type="text" name="source" handleChange={() => { }} />
                        <Input placeholder="Keyword (Gif)" type="text" name="keyword" handleChange={() => { }} />
                        <Input placeholder="Description" type="text" name="message" handleChange={() => { }} />

                        {/* Separator */}
                        <div className="h-[1px] w-full bg-gray bg-gray-400 my2" />

                        {false ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleSubmit()}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#3d4f7c]"
                            >
                                Get link
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Welcome;