import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useAuth } from "../../contexts/auth";
import "./UserPanel.scss";
import { signOut } from "../../api/auth";
import { useSelector } from "react-redux";

export default function UserPanel({ menuMode }) {
  const navigate = useNavigate();

  const navigateToProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);
  // const menuItems = useMemo(
  //   () => [
  //     {
  //       text: "Profile",
  //       icon: "user",
  //       onClick: navigateToProfile,
  //     },
  //     {
  //       text: "Logout",
  //       icon: "runner",
  //       onClick: signOut(localStorage.getItem("RefreshToken")),
  //     },
  //   ],
  //   [navigateToProfile, signOut]
  // );
  const menuItems = [
    {
      text: "Profile",
      icon: "user",
      onClick: navigateToProfile,
    },
    {
      text: "Logout",
      icon: "runner",
      onClick: signOut(localStorage.getItem("RefreshToken")),
    },
  ];
  const profile = useSelector((state) => state.SYS_Profile);
  console.log(">>aa", profile);
  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"image-container"}>
          <div
            style={{
              background: `url(../../public/logo192.png) no-repeat #fff`,
              backgroundSize: "cover",
            }}
            className={"user-image"}
          />
        </div>
        <div className={"user-name"}>{profile.NguoiDungId}</div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".user-button"}
          showEvent={"dxclick"}
          width={210}
          cssClass={"user-menu"}
        >
          <Position
            my={{ x: "center", y: "top" }}
            at={{ x: "center", y: "bottom" }}
          />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}
