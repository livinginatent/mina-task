"use client";
import { Button } from "@/components/Button";
import UploadDocument from "@/components/UploadDocument/UploadDocument";
import {
  StyledMainWrapper,
  StyledUploadWrapper,
} from "@/components/UploadDocument/styles";
import Upload from "@/modules/Upload";

import Image from "next/image";

export default function Home() {
  return (
    <UploadDocument/>
  );
}
