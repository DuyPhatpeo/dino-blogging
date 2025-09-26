import React, { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { Camera, Trash2, Upload, Image as ImageIcon } from "lucide-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const UploadContainer = styled.div`
  position: relative;
  width: ${(props) => props.width || "280px"};
  height: ${(props) => props.height || "280px"};
  border-radius: ${(props) => (props.shape === "circle" ? "50%" : "20px")};
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  border: 1px solid rgba(148, 163, 184, 0.2);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    border-color: rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    width: ${(props) => Math.min(parseInt(props.width) || 280, 240) + "px"};
    height: ${(props) => Math.min(parseInt(props.height) || 280, 240) + "px"};
  }

  @media (max-width: 480px) {
    width: ${(props) => Math.min(parseInt(props.width) || 280, 200) + "px"};
    height: ${(props) => Math.min(parseInt(props.height) || 280, 200) + "px"};
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.08);
    filter: brightness(1.1) saturate(1.1);
  }
`;

const UploadArea = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 50%, #f1f5f9 100%);
  border: 2px dashed rgba(148, 163, 184, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 16px;
  color: #64748b;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(99, 102, 241, 0.1),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);
    border-color: rgba(99, 102, 241, 0.6);
    color: #4338ca;
    transform: scale(0.98);

    &::before {
      left: 100%;
    }

    svg {
      transform: scale(1.2) rotate(5deg);
      color: #6366f1;
    }

    .upload-text {
      transform: translateY(-2px);
    }
  }

  svg {
    width: 40px;
    height: 40px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    color: #94a3b8;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  .upload-text {
    font-size: 16px;
    text-align: center;
    line-height: 1.5;
    font-weight: 600;
    transition: transform 0.3s ease;
    word-wrap: break-word;
    white-space: normal;
    max-width: 90%;

    small {
      display: block;
      font-size: 13px;
      color: #94a3b8;
      font-weight: 400;
      margin-top: 4px;
      white-space: normal;
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(4px);

  &:hover {
    opacity: 1;
    transform: scale(1.02);
  }
`;

const OverlayButton = styled.label`
  background: rgba(255, 255, 255, 0.95);
  color: #374151;
  border: none;
  padding: 16px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: white;
    transform: scale(1.2) rotate(5deg);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  svg {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease;
  }

  &:hover svg {
    color: #6366f1;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 14px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    transition: all 0.4s ease;
    transform: translate(-50%, -50%);
  }

  ${(props) =>
    props.variant === "change"
      ? `
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%);
    color: white;
    
    &:hover {
      transform: translateY(-4px) scale(1.1);
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
      
      &::before {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  `
      : `
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
    color: white;
    
    &:hover {
      transform: translateY(-4px) scale(1.1);
      box-shadow: 0 8px 30px rgba(239, 68, 68, 0.5);
      
      &::before {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  `}

  &:active {
    transform: translateY(-2px) scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
    z-index: 1;
    transition: all 0.3s ease;
  }
`;

const FileName = styled.div`
  font-size: 12px;
  color: #64748b;
  text-align: center;
  max-width: 280px;
  word-wrap: break-word;
  white-space: normal;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  line-height: 1.4;
`;

const StatusText = styled.div`
  font-size: 13px;
  color: #10b981;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ImageUpload = ({
  control,
  name,
  width = "280px",
  height = "280px",
  shape = "rectangle",
  defaultValue,
}) => {
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState(defaultValue || null);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (defaultValue && !preview) {
      setPreview(defaultValue);
      field.onChange(defaultValue);
    }
  }, [defaultValue]); // eslint-disable-line

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    field.onChange(file);
  };

  const handleRemoveImage = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    field.onChange(null);
    setPreview(null);
    setFileName("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        setFileName(file.name);
        field.onChange(file);
      }
    }
  };

  return (
    <Wrapper>
      <UploadContainer
        width={width}
        height={height}
        shape={shape}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <HiddenInput
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
          id={`upload-${name}`}
        />

        {preview ? (
          <>
            <PreviewImage src={preview} alt="preview" />
            <ImageOverlay>
              <OverlayButton htmlFor={`upload-${name}`}>
                <Camera />
              </OverlayButton>
            </ImageOverlay>
          </>
        ) : (
          <UploadArea
            htmlFor={`upload-${name}`}
            style={{
              borderColor: isDragOver ? "#3b82f6" : "#cbd5e1",
              background: isDragOver
                ? "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
                : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
            }}
          >
            {isDragOver ? (
              <>
                <Upload />
                <span>Drop here</span>
              </>
            ) : (
              <>
                <ImageIcon />
                <div className="upload-text">
                  <span>Upload</span>
                  <small>or drag</small>
                </div>
              </>
            )}
          </UploadArea>
        )}
      </UploadContainer>

      {preview && (
        <>
          <Controls>
            <ActionButton
              variant="change"
              as="label"
              htmlFor={`upload-${name}`}
            >
              <Camera />
            </ActionButton>
            <ActionButton variant="remove" onClick={handleRemoveImage}>
              <Trash2 />
            </ActionButton>
          </Controls>

          {fileName && <FileName>{fileName}</FileName>}

          <StatusText>
            <ImageIcon />
            Image ready to upload
          </StatusText>
        </>
      )}
    </Wrapper>
  );
};

export default ImageUpload;
