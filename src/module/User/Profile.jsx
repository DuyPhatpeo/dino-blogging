// Profile.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@services/firebase/firebase-config";
import { useAuth } from "@contexts/authContext";
import styled from "styled-components";
import LoadingSpinner from "@components/Loading/LoadingSpinner";

// ========== Styled ==========
const Wrapper = styled.div`
  max-width: 420px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
`;

const AvatarSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
  margin-bottom: 12px;
`;

const AvatarPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 12px;
`;

const FullName = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
`;

const Username = styled.p`
  margin: 4px 0 0;
  font-size: 1rem;
  color: #718096;
`;

const InfoGroup = styled.div`
  margin: 16px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f9fafb;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: #fff;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  ${(p) =>
    p.primary
      ? `
    background: #667eea;
    color: #fff;
    &:hover { background: #5a67d8; }
  `
      : `
    background: #edf2f7;
    color: #2d3748;
    &:hover { background: #e2e8f0; }
  `}
`;

// ========== Component ==========
const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchUser = async () => {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
          setForm(snap.data());
        }
      } catch (err) {
        console.error("🔥 Fetch user error:", err);
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, {
        avatar: form.avatar || "",
        username: form.username || "",
        email: form.email || "",
        fullname: form.fullname || "",
        updatedAt: serverTimestamp(),
      });
      setProfile({ ...form, updatedAt: new Date() });
      setEditMode(false);
    } catch (err) {
      console.error("🔥 Update user error:", err);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

  if (!profile) {
    return (
      <Wrapper>
        <LoadingSpinner size="40px" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <AvatarSection>
        {profile.avatar ? (
          <Avatar src={profile.avatar} alt="Avatar" />
        ) : (
          <AvatarPlaceholder>
            {getInitials(profile.fullname || profile.username)}
          </AvatarPlaceholder>
        )}
        <FullName>{profile.fullname || "Unknown User"}</FullName>
        <Username>@{profile.username || "user"}</Username>
      </AvatarSection>

      {editMode ? (
        <>
          <InfoGroup>
            <Label>Avatar URL</Label>
            <Input
              type="url"
              name="avatar"
              value={form.avatar || ""}
              onChange={handleChange}
            />
          </InfoGroup>
          <InfoGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
            />
          </InfoGroup>
          <InfoGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
            />
          </InfoGroup>
          <InfoGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={form.fullname || ""}
              onChange={handleChange}
            />
          </InfoGroup>
        </>
      ) : (
        <>
          <InfoRow>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{profile.email || "-"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Full Name</InfoLabel>
            <InfoValue>{profile.fullname || "-"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Username</InfoLabel>
            <InfoValue>@{profile.username || "-"}</InfoValue>
          </InfoRow>
        </>
      )}

      <ButtonGroup>
        {editMode ? (
          <>
            <Button primary onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        ) : (
          <Button primary onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </ButtonGroup>
    </Wrapper>
  );
};

export default Profile;
