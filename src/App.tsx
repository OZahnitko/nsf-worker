import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { VideoPlayer } from "./components";
import { Wrapper } from "./Styles";

function App() {
  interface Data {
    files: string[];
  }

  const [fileNames, setFileNames] = useState<string[]>([]);

  const [littleList, setLittleList] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: AxiosResponse<Data> = await axios.get(
        "http://localhost:5000/getFileList"
      );

      setFileNames(() => response.data.files);
    };

    getData();
  }, []);

  return (
    <Wrapper>
      <button
        onClick={() =>
          setLittleList((littleList) => [
            ...littleList,
            fileNames[littleList.length],
          ])
        }
      >
        Add to list
      </button>

      {fileNames &&
        littleList.map((file) => (
          <VideoPlayer
            fileName={file}
            key={file}
            onLoaded={() =>
              setLittleList((littleList) => {
                if (littleList.length <= fileNames.length) {
                  return [...littleList, fileNames[littleList.length - 1]];
                } else {
                  return littleList;
                }
              })
            }
          />
        ))}
    </Wrapper>
  );
}

export default App;
