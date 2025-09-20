import React, { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { RefreshCw, Trash2, Upload } from "lucide-react";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const UploadBox = styled.div`
  position: relative;
  width: ${(props) => props.width || "220px"};
  height: ${(props) => props.height || "220px"};
  aspect-ratio: ${(props) => props.ratio || "auto"};
  background: ${(props) => props.theme.colors.grayLight};
  border: 2px dashed ${(props) => props.theme.colors.grayDark};
  border-radius: ${(props) =>
    props.shape === "circle" ? "50%" : props.theme.radius.xl};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.shadow.md};
  max-width: 100%;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${(props) => props.theme.shadow.lg};
    border-color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }
  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: ${(props) =>
    props.shape === "circle" ? "50%" : props.theme.radius.xl};
`;

const IconButton = styled.label`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: ${(props) =>
    props.remove ? props.theme.colors.delete : props.theme.colors.detail};
  cursor: pointer;
  transition: all 0.25s ease;

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
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
  font-weight: 500;
  transition: all 0.25s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 480px) {
    svg {
      width: 22px;
      height: 22px;
    }
    font-size: 12px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const ImageUpload = ({
  control,
  name,
  width,
  height,
  ratio,
  shape = "rectangle",
  defaultValue,
}) => {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState(defaultValue || null);

  useEffect(() => {
    if (defaultValue && !preview) {
      setPreview(defaultValue);
      field.onChange(defaultValue);
    }
  }, [defaultValue]); // eslint-disable-line

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    field.onChange(file);
  };

  const handleRemoveImage = () => {
    field.onChange(null);
    setPreview(null);
  };

  return (
    <Wrapper>
      <UploadBox width={width} height={height} ratio={ratio} shape={shape}>
        <HiddenInput
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
          id={`upload-${name}`}
        />

        {preview ? (
          <PreviewImage src={preview} alt="preview" shape={shape} />
        ) : (
          <Placeholder htmlFor={`upload-${name}`}>
            <Upload />
            <span>Upload Image</span>
          </Placeholder>
        )}
      </UploadBox>

      {preview && (
        <Controls>
          <IconButton htmlFor={`upload-${name}`}>
            <RefreshCw />
          </IconButton>
          <IconButton as="button" remove onClick={handleRemoveImage}>
            <Trash2 />
          </IconButton>
        </Controls>
      )}
    </Wrapper>
  );
};

export default ImageUpload;
