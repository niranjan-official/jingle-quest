"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useGlobalContext } from "../context";
import Loading from "../../components/loading";
import wrap from "../../public/images/wrap.svg";
import Image from "next/image";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { load, setLoad } = useGlobalContext();

  const router = useRouter();

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        userCredential.user.displayName = name;
        setLoad(true);
        // const user = userCredential.user;
        await setDoc(doc(db, "users", email), {
          name: name,
          a: false,
          b: false,
          c: false,
          d: false,
          // e: false,
          // f: false,
          // g: false,
          // h: false,
          // i: false,
          // j: false,
          qr: false,
          path: [],
          startTime: new Date(),
          endTime: new Date(),
        })
          .then(() => {
            router.push("/instruction");
          })
          .catch((err) => {
            const errorMessage = err.message;
            alert("Signup Failed, Try Again", errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  if (!load) {
    return (
      <div className="h-screen primary-bg bg-color items-center">
        <div className="w-full h-auto">
          <Image
            src={wrap}
            width={0}
            height={0}
            alt="trophy"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="p-2">
          <div className="w-full p-6 border-2 rounded-lg border-white flex flex-col items-center text-white">
            <h1 className="mb-2 text-5xl font-serif font-bold ">SIGN UP</h1>
            <input
              value={name}
              className="input"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Team Name"
            />
            <input
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button
              onClick={handleSubmit}
              className="l-button rounded-3xl w-1/2 mt-6"
            >
              GET IN
            </button>
            <Link href="/login" className="cursor-pointer mt-5">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
