import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useSelector } from "react-redux";

import { Avatar, Box, Container, Typography } from "@mui/material";

import { RootState } from "../redux/store";
import { Sub } from "../types";
import CButton from "./custom/CButton";

interface SubProps {
  sub: Sub;
}

const SubHeader: React.FC<SubProps> = ({ sub }) => {
  const [ownsSub, setOwnsSub] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (!sub) return;
    const isOwn = data?.username === sub.username;
    setOwnsSub(isOwn);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownsSub) return;
    fileInputRef.current!.name = type;
    fileInputRef.current!.click();
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current!.name);

    try {
      await axios.post(`/subs/${sub?.name}/image`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      mutate(`/subs/${sub?.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {sub && (
        <>
          <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
          <Box sx={{ background: "white", mb: "1rem" }}>
            {sub.bannerURN ? (
              <Box
                sx={{
                  height: "24vh",
                  backgroundImage: `url(${sub.bannerURN})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  cursor: ownsSub ? "pointer" : "",
                  backgroundColor: "skyblue",
                }}
                onClick={() => openFileInput("banner")}
              ></Box>
            ) : (
              <Box style={{ height: "24vh", background: "skyblue" }} />
            )}

            <Container maxWidth="lg" sx={{ height: "90px", display: "flex", position: "relative" }}>
              <Box sx={{ cursor: ownsSub ? "pointer" : "" }}>
                <Avatar
                  src={`${sub.imageURN}`}
                  alt="subreddit image"
                  sx={{ height: "80px", width: "80px", position: "absolute", top: -15 }}
                  onClick={() => openFileInput("image")}
                />
              </Box>
              <Box sx={{ pl: "6rem" }}>
                <Typography variant="h5">{sub.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  /r/{sub.name}
                </Typography>
              </Box>
              <Box sx={{ m: "0.5rem 1rem" }}>
                <CButton variant="contained">Join</CButton>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default SubHeader;
