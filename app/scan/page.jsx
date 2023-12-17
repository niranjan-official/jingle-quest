"use client";
import React, { useEffect, useState } from "react";
import { handleData, handleQuestionSubmit, shuffle } from "../functions";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "../../components/loading";
import { useGlobalContext } from "../context";
import Header from "../../components/header";
import Image from "next/image";
import box from "../../public/images/box.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const Scan = () => {
  const router = useRouter();
  const [hint, setHint] = useState({});
  const { load, setLoad } = useGlobalContext();
  const [answer, setAnswer] = useState("");
  const [wrongAns, setWrongAns] = useState(0);
  const User = useAuth();

  const fetchData = async () => {
    setWrongAns(0);
    setLoad(true);
    const obj = await handleData(User.email);
    if (!obj.StartTime) {
      setHint({
        hint: obj.hint.h,
        letter: obj.hint.letter,
        level: obj.level,
        userName: obj.userName,
      });
      setLoad(false);
    } else {
      alert("Game completed !!!");
      router.push("/completion");
    }
  };
  useEffect(() => {
    if (User) {
      fetchData();
    }
  }, [User]);
  const handleSubmit = async () => {
    let LowerCaseAnswer = answer.toLocaleLowerCase();
    let Answer = LowerCaseAnswer.replace(/\s/g, "");
    if (Answer === hint.letter) {
      alert("Correct answer");
      setLoad(true);
      const state = await handleQuestionSubmit(User);
      if (state) {
        fetchData();
      } else {
        alert("Got Error");
      }
    } else {
      if (wrongAns == 2) {
        alert(
          "Answered wrong 3 times... sorry your game is going to restart!!"
        );
        setLoad(true);
        const path = await shuffle("abcd");
        const array = path.split("");
        const washingtonRef = doc(db, "users", User.email);
        await updateDoc(washingtonRef, {
          path: array,
          a: false,
          b: false,
          c: false,
          d: false,
        })
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        alert(`Wrong !! ${2 - wrongAns} attempts left`);
        setWrongAns((prevCount) => prevCount + 1);
      }
    }
    setAnswer("");
  };

  // If you want to prefer front camera
  if (User) {
    if (!load) {
      return (
        <div className=" bg-color min-h-max flex flex-col text-white">
          <Header UserName={hint.userName} />
          <div className="h-full primary-bg p-3">
            <div className="w-full h-14 mt-20 border-2 border-white rounded-xl"></div>
            <div className="w-full h-2/5 p-2 pt-5">
              <Image
                src={box}
                width={0}
                height={0}
                alt="box"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div className="h-3/5 p-4 flex flex-col justify-center items-center b-1">
              <div className="w-full rounded-xl pt-2 pb-8 shadow-inner shadow-orange-950">
                <h3 className="text-lg p-3 rounded-xl mt-3">
                  Hint: {hint.hint}
                </h3>
              </div>
              <div className="flex h-14 w-2/5 mt-3 rounded-xl shadow-inner shadow-orange-950 p-1">
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  type="text"
                  className="w-full h-full focus:outline-none bg-transparent border-b-2 mb-1 text-4xl p-2 border-b-white"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="l-button bg-none w-1/3 mt-4 shadow-md"
              >
                Submit
              </button>
              <h2 className="mt-3">{3 - wrongAns} attempts left !!</h2>
            </div>
          </div>
          {/* <h1 className='text-2xl bg-orange-100 p-1 rounded-lg shadow-inner shadow-orange-950 text-orange-950 absolute left-3 top-16 font-serif'>Level: {hint.level}</h1> */}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
};

export default Scan;
