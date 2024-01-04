"use client";
import Button from "@/components/button";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import LeadText from "@/components/leadText";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/input/index";

export default function Page() {
  const [nameError, setnameError] = useState(false);
  const [wishesError, setwishesError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  async function submitForm(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const wishes = e.target.elements.wishes.value;
    const name = e.target.elements.name.value;
    const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/; // Wzorzec dopasowujący tylko litery, spacje i polskie litery
    if (!regex.test(name)) {
      setIsLoading(false);
      return;
    }

    var isName = false;
    var isWishes = false;
    var uploadArray: File[] = [];
    if (files.length === 0) {
      uploadArray = [];
    } else {
      uploadArray = [...files];
    }
    if (name.length === 0) {
      isName = true;
      setnameError(true);
    }
    if (wishes.length === 0) {
      isWishes = true;
      setwishesError(true);
    }
    if (isName || isWishes) {
      setIsLoading(false);
      return false;
    }
    const data = new FormData();
    data.append("wishes", wishes);
    data.append("name", name);
    for (const f of uploadArray) {
      data.append("upload", f);
    }


    const response = await axios.post("/api/send/wishes", data, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total !== undefined) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(progress);
        }
      },
    });
    setIsLoading(false);
    /*if (response.data.type) {
      router.replace(`/wishes/${response.data.type}`);
    }*/
  }

  return (
    <form onSubmit={submitForm} className={"flex flex-col gap-4 max-w-xl"}>
      <LeadText>Zostaw po sobie pamiątkę w postaci życzeń!</LeadText>
      <Input
        label={"Podpisz się"}
        id={"name"}
        placeholder={"Janek Kowalski"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.length !== 0) {
            setnameError(false);
          }
        }}

        isError={nameError}
        errorMessage={"Uzupełnij imię!"}
        required={true}
        pattern={"^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻs ]+$"}
      />
      <Input
        label={"Tutaj napisz życzenia"}
        id={"wishes"}
        placeholder={"Treść życzeń..."}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.length !== 0) {
            setwishesError(false);
          }
        }}
        type={"textarea"}
        isError={wishesError}
        errorMessage={"Uzupełnij życzenia!"}
      />
      <Input
        label={"Masz jakieś fotki z tego wydarzenia? Dołącz je do życzeń!"}
        id={"upload"}
        type={"file"}
        dataFiles={files}
        setFiles={setFiles}
        isLoading={isLoading}
      />
      <Button disabled={isLoading} className={"relative"}>
        {isLoading && (
          <div
            style={{ width: `${progress}%` }}
            className={`absolute left-0 bottom-0  h-2 bg-green-500`}
          ></div>
        )}
        {isLoading && <ImSpinner2 className={"animate-spin"} />}
        {isLoading
          ? progress == 100
            ? "Zapisywanie na serwerze..."
            : `Wysyłanie... ${progress}%`
          : "Wyślij życzenia"}
      </Button>
    </form>
  );
}
