import { RiDeleteBin6Line } from "react-icons/ri"
import { MdOutlineVideoFile } from "react-icons/md";
import MemoImage from "../memoImage";
import { useMemo, Dispatch, SetStateAction } from "react";

interface FilesInspectProps {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
}

const FilesInspect = ({ files, setFiles }: FilesInspectProps) => {

    const memoizedFiles = useMemo(() => files, [files]);

    const deleteFile = (setFiles: (files: any) => void, index: number) => {
        setFiles((old: any) => {
            const updatedFiles = [...old]
            updatedFiles.splice(index, 1)
            return updatedFiles;
        })
    }
    if (files === null) {
        return null;
    }
    return (
        memoizedFiles &&
        memoizedFiles.map((file, index) => (
            <div className={'flex h-28 w-full'} key={URL.createObjectURL(file)}>
                <div className={' w-3/5 relative flex items-center justify-center'}>
                    {file.type.includes("video") ?
                        <MdOutlineVideoFile className={'text-8xl text-purple-800'} />
                        :
                        <MemoImage src={URL.createObjectURL(file)} />
                    }
                </div>
                <button onClick={() => deleteFile(setFiles, index)} type="button" className={'flex flex-col items-center justify-center w-2/5 text-red-500 text-xl font-bold bg-primary'}><RiDeleteBin6Line /> Usuń</button>
            </div>

        ))
    );
};

const handleAddImages = (e: any, files: any, setFiles: any) => {
    const f = Array.from(e.target.files)
    const newArray = files.concat(f)
    setFiles(newArray);
};

export { handleAddImages, FilesInspect };
