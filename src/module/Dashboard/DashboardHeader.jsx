import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { useAuth } from "@contexts/authContext";
import { db } from "@services/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const DashboardHeaderStyles = styled.header`
  background-color: #fff;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;

  .header-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .menu-toggle {
    display: none;
    @media (max-width: 767px) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
      svg {
        width: 22px;
        height: 22px;
      }
      &:hover {
        background: ${(props) => props.theme.grayLight};
      }
    }
  }

  .header-button {
    font-weight: 500;
    font-size: 0.95rem;
    height: 42px;
    padding: 0 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;

    svg {
      width: 18px;
      height: 18px;
    }

    span {
      display: inline;
    }

    &:hover {
      background: ${(props) => props.theme.grayLight};
    }

    @media (max-width: 640px) {
      padding: 0 12px;
      span {
        display: none; /* ẩn chữ Home trên mobile */
      }
    }
  }

  .header-avatar {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid ${(props) => props.theme.primary};
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.05);
      }
    }

    span {
      font-weight: 500;
      font-size: ${(props) => props.theme.fontSize.sm};

      @media (max-width: 640px) {
        display: none; /* ẩn tên trên mobile */
      }
    }
  }
`;

const DashboardHeader = ({ onToggleMenu }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [avatarURL, setAvatarURL] = useState("https://i.pravatar.cc/300");

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.uid) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAvatarURL(data.avatar || "https://i.pravatar.cc/300");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvatar();
  }, [user]);

  return (
    <DashboardHeaderStyles>
      <div className="header-left">
        <div className="menu-toggle" onClick={onToggleMenu}>
          <Menu />
        </div>
      </div>

      <div className="header-right">
        <Button className="header-button" onClick={() => navigate("/")}>
          <Home /> <span>Home</span>
        </Button>
        <div className="header-avatar">
          <img src={avatarURL} alt={user?.displayName || "User"} />
          <span>{user?.displayName || "User"}</span>
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
