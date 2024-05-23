import { useState } from "react";
import useStore from "./utilities/Store";

interface FolderProps {
  folder: {
    dir: string;
    isFolder: boolean;
    files: any[];
  };
  onClick?: () => any;
}

export function Folder({ folder }: FolderProps) {
  const [visible, setVisible] = useState(false);
  const pushStore = useStore((state) => state.pushStore);
  const clearStore = useStore((state) => state.clearStore);

  const handlePushStore = (folder: {
    dir: string;
    isFolder: boolean;
    files: any;
  }) => {
    const pushRecursive = (item: {
      dir: string;
      isFolder: boolean;
      files: any;
    }) => {
      pushStore(item);
      if (item.isFolder && item.files) {
        item.files.forEach(pushRecursive);
      }
    };

    clearStore();
    pushRecursive(folder);
  };

  return (
    <div className="">
      {folder.isFolder ? (
        <div>
          <div className="" onClick={() => setVisible(!visible)}>
            {folder.dir}
          </div>
          <div style={{ display: visible ? "block" : "none" }}>
            {folder.files?.map((item, i) => (
              <div key={i} onClick={() => handlePushStore(item)}>
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
