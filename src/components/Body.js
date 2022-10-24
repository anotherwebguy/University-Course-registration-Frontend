import React from 'react'
import { useState, useEffect } from 'react';
import './Body.css';
import {ethers} from 'ethers';
import Enroll from "../artifacts/Enroll.json";

function Body() {
    const [acc, setAcc] = useState(false);
    const [userAcc, setUserAcc] = useState("");
    const [sub, setSub] = useState(1);
    const [sub2, setSub2] = useState(1);
    const [numStudents, setNumStudents] = useState(-1);
    const address = "0xA6F4BE0d4426AE700848388156c58F0A21A51331";
    console.log(ethers.BigNumber.from("0x2a"));
    
    useEffect(() => {
        if (window.ethereum) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
        }
        requestAccount();
    }, []);

    const submitEnrollment = async (event) => {
        event.preventDefault();
        await requestAccount();
        if (typeof window.ethereum !== "undefined" && acc === true) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(address, Enroll.abi, signer);
    
          // const data = await contract.show(sub);
          const data = await contract.select(userAcc, sub);
    
          console.log(data);
        }
    };

    const viewEnrollment = async (e) => {
        e.preventDefault();
        await requestAccount();
        console.log(sub2);
        console.log(userAcc);
    
        if (typeof window.ethereum !== "undefined" && acc === true) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(address, Enroll.abi, signer);
    
          // const data = await contract.show(sub);
          const data = await contract.show(sub2);
    
          console.log(data._hex);
          const a = parseInt(data._hex, 16);
          setNumStudents(a);
          console.log(a);
        }
    };

    async function requestAccount() {
        if (window.ethereum) {
            console.log("detected");

            try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setUserAcc(accounts[0]);
            setAcc(true);
            } catch (error) {
            console.log("Error connecting...");
            }
        } else {
            alert("Meta Mask not detected");
        }
    }

    const show = (e) => {
        setSub(e.target.value);
        console.log(sub);
    };

    const show2 = (e) => {
        setSub2(e.target.value);
        console.log(sub2);
    };

  return (
    <div>
        <div class="container">
            <div class="card-deck mb-3">
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h2 class="my-0 font-weight-normal text-center"><strong>Enroll Here</strong></h2>
                    </div>
                    <div class="card-body">
                        <h1>ID - {userAcc}</h1>
                        <br/>
                        <form onSubmit={submitEnrollment}>
                            <select className="admission" required onChange={show}>
                                <option value="1">BlockChain</option>
                                <option value="2">Natural Language Processing</option>
                                <option value="3">Machine Vision</option>
                                <option value="4">Artificial Intelligence</option>
                            </select>&nbsp;
                            <button className = "btn btn-primary" type="submit">Enroll</button>
                        </form>
                        <br/>
                        <br/>
                        <h1>View Enrollment information</h1>
                        <form onSubmit={viewEnrollment}>
                            <select className="admission1" required onChange={show2}>
                            <option value="1">BlockChain</option>
                            <option value="2">Natural Language Processing</option>
                            <option value="3">Machine Vision</option>
                            <option value="4">Artificial Intelligence</option>
                            </select>&nbsp;
                            <button className="btn btn-primary" type="submit">Check</button>
                        </form>
                        <br/>
                        {numStudents !== -1 ? <h3>Number of students enrolled: {numStudents}</h3> : <h1> </h1>}
                        <br/>
                        <button className="btn btn-dark">Connect metamask</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body
