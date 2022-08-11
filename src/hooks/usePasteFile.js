import { useEffect, useState } from "react";

export const usePasteFile = () => {
  // let blobUrl;
  const [blobUrl, setBlobUrl] = useState("");
  console.log({ blobUrl });
  useEffect(() => {
    const pasteFile = (e) => {
      e.preventDefault();
      console.log("clbd file: ", e.clipboardData.files);
      console.log("clbd data ", e.clipboardData);
      const file = e.clipboardData.files[0];
      if (file) {
        const blob = new Blob([file], {
          type: file.type,
        });
        setBlobUrl(URL.createObjectURL(blob));
        const link = Object.assign(document.createElement("a"), {
          href: blobUrl,
          style: { display: "none" },
        });
        document.body.appendChild(link);
        console.log("link: ", link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
      } else {
        console.log("Can't paste file");
      }
    };
    document.addEventListener("paste", pasteFile);

    return () => {
      document.removeEventListener("paste", pasteFile);
    };
  }, []);
  return {
    fileUrl: blobUrl,
  };
};
