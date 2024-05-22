import { useState } from "react";

interface FolderProps {
  folder: {
    dir: string;
    isFolder: boolean;
    files?: { dir: string; isFolder: boolean }[];
  };
  onClick?: () => void;
}

export function Folder({ folder }: FolderProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="">
      {folder.isFolder ? (
        <div>
          <div className="" onClick={() => setVisible(!visible)}>
            {folder.dir}
          </div>
          <div style={{ display: visible ? "block" : "none" }}>
            {folder.files?.map((item, i) => (
              <div key={i}>
                {item.isFolder ? <Folder folder={item} /> : item.dir}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>{folder.dir}</div>
      )}
    </div>
  );
}
