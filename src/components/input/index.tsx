"use client";
import localFont from "next/font/local";
import { ChangeEventHandler, DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { handleAddImages, FilesInspect } from "./handleUpload";
import Image from "next/image";



interface InputProps {
  id: string;
  label: string;
  onChange?: any;//ChangeEventHandler<HTMLInputElement
  type?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  dataFiles?: File[];
  setFiles?: Dispatch<SetStateAction<File[]>>;
  setfilesError?: (error: boolean) => void;
  required?: boolean;
  pattern?: string;
  isLoading?: boolean;
  setSearch?: (search: string) => void;
}
export default function Input({
  id,
  label,
  onChange = () => { },
  type = "text",
  placeholder = "",
  isError = false,
  errorMessage = "",
  dataFiles,
  setFiles = () => { },
  setfilesError = () => { },
  required = false,
  pattern,
  isLoading,
  setSearch,
}: InputProps) {
  const [inputText, setInputText] = useState(false);

  if (type === "file") {
    return (
      <>
        <div className={`flex flex-col  `}>
          <label className={"text-2xl text-justify"} htmlFor={id}>
            {label}
          </label>
          <div className={"relative  h-40"}>
            <div
              className={`absolute bg-primary focus:outline-orange-400 w-full h-full px-2 py-8  text-3xl ${inputText ? "text-primary" : "text-secondary"
                } flex gap-2 flex-col justify-center items-center ${isError ? "  border-4 border-red-500 " : " border-primary "
                } `}
            >
              {inputText ? `Dołączone pliki: ${dataFiles && dataFiles.length}` : "Dołącz pliki"}
              <BsUpload className={"text-4xl"} />
            </div>
            <input
              className={"opacity-0 cursor-pointer absolute w-full h-full"}
              id={id}
              type={type}
              name={id}
              multiple
              data-files={dataFiles}
              accept="image/*,video/*"
              onChange={(e) => {
                setfilesError(false);
                handleAddImages(e, dataFiles, setFiles);
                setInputText(true);
              }}
              required={required}
            />
          </div>
          {isError && <label>{errorMessage}</label>}
          {!isLoading && dataFiles && dataFiles.length !== 0 && (
            <div className={"border mt-2"}>
              <div
                className={"grid grid-cols-2 gap-1 max-h-60 overflow-y-auto"}
              >
                <FilesInspect files={dataFiles} setFiles={setFiles} />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
  if (type === "textarea") {
    return (
      <div className={`flex flex-col  `}>
        <label className={"text-2xl text-justify"} htmlFor={id}>
          {label}
        </label>
        <textarea
          className={`
            ${isError ? "  border-4 border-red-500 " : " border-primary "} 
            px-2 py-4 
            text-3xl 
            bg-primary 
            focus:outline-orange-400
  
            `}
          id={id}
          name={id}
          onChange={onChange}
          placeholder={placeholder}
          rows={1}
          required={required}
        ></textarea>
        {isError && <label>{errorMessage}</label>}
      </div>
    );
  }
  if (type === "search") {
    return (
      <div className={`flex flex-col  `}>
        <label className={"text-2xl text-justify"} htmlFor={id}>
          {label}
        </label>
        <input
          className={`
          ${isError ? "  border-4 border-red-500 " : " border-primary "} 
          px-2 py-4 
          text-3xl 
          bg-primary 
          focus:outline-orange-400

          `}
          id={id}
          type={type}
          name={id}
          onChange={(e) => { if (setSearch) return setSearch(e.target.value) }}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          title={
            pattern &&
            "Twój podpis powinien się składać tylko z liter i spacji! :)"
          }
        />
        {isError && <label>{errorMessage}</label>}
      </div>
    );
  }
  return (
    <div className={`flex flex-col `}>
      <label className={"text-2xl text-justify"} htmlFor={id}>
        {label}
      </label>
      <input
        className={`
          ${isError ? "  border-4 border-red-500 " : " border-primary "} 
          px-2 py-4 
          text-3xl 
          bg-primary 
          focus:outline-orange-400

          `}
        id={id}
        type={type}
        autoComplete="off"
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        title={
          pattern &&
          "Twój podpis powinien się składać tylko z liter i spacji! :)"
        }
      />
      {isError && <label>{errorMessage}</label>}
    </div>
  );
}
