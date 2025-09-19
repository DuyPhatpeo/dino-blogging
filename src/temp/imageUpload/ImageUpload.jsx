import React, { useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { RefreshCw, Trash2 } from "lucide-react";
import imagechoose from "@assets/image.png";

const Wrapper = styled.div`
  width: 100%;
`;
const UploadBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: ${(props) => props.theme.colors.grayLight};
  border-radius: ${(props) => props.theme.radius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.colors.gray};
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${UploadBox}:hover & {
    transform: scale(1.05);
  }
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${UploadBox}:hover & {
    opacity: 1;
  }
`;
const Button = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.radius.md};
  color: #fff;
  font-size: ${(props) => props.theme.fontSize.sm};
  cursor: pointer;
  background: ${(props) =>
    props.remove ? props.theme.colors.delete : props.theme.colors.detail};
  &:hover {
    background: ${(props) =>
      props.remove
        ? props.theme.colors.deleteHover
        : props.theme.colors.detailHover};
  }
`;
const Placeholder = styled.label`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.grayDark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.sm};
`;
const PlaceholderImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  opacity: 0.6;
`;

const ImageUpload = ({ control, name }) => {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState(null);

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file)); // chỉ preview
    field.onChange(file); // lưu File object
  };

  const handleRemoveImage = () => {
    field.onChange(null);
    setPreview(null);
  };

  return (
    <Wrapper>
      <UploadBox>
        <HiddenInput
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
          id={`upload-${name}`}
        />
        {preview ? (
          <>
            <PreviewImage src={preview} alt="preview" />
            <Overlay>
              <Button htmlFor={`upload-${name}`}>
                <RefreshCw size={16} /> Change
              </Button>
              <Button as="button" remove onClick={handleRemoveImage}>
                <Trash2 size={16} /> Remove
              </Button>
            </Overlay>
          </>
        ) : (
          <Placeholder htmlFor={`upload-${name}`}>
            <PlaceholderImage src={imagechoose} alt="choose" />
            <span>Choose Image</span>
          </Placeholder>
        )}
      </UploadBox>
    </Wrapper>
  );
};

export default ImageUpload;
