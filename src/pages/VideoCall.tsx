import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    ZegoUIKitPrebuilt: any;
  }
}

const VideoCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;

    if (!document.fullscreenElement) {
      videoWrapperRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const bookingData = location.state?.bookingData;

  // Extract roomID from URL params or state
  const params = new URLSearchParams(location.search);
  const paramRoomID = params.get("roomID");
  const roomID =
    paramRoomID ||
    location.state?.roomID ||
    Math.floor(Math.random() * 10000) + "";
  const effectiveRoomID = roomID;

  useEffect(() => {
    if (!effectiveRoomID) {
      navigate("/find");
      return;
    }

    const initializeVideoCall = () => {
      if (!window.ZegoUIKitPrebuilt || !containerRef.current) return;

      const userID = Math.floor(Math.random() * 10000) + "";
      const userName = "userName" + userID;
      const appID = 588617023;
      const serverSecret = "dd262916d68e648b919e3724c20353b9";
      const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        effectiveRoomID,
        userID,
        userName
      );

      zpRef.current = window.ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              effectiveRoomID,
          },
        ],
        scenario: {
          mode: window.ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: false,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
        showJoinConfirmDialog: false,
      });
    };

    // Load Zego script if not already loaded
    if (!window.ZegoUIKitPrebuilt) {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
      script.onload = initializeVideoCall;
      document.head.appendChild(script);
    } else {
      initializeVideoCall();
    }

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [effectiveRoomID, navigate]);

  if (!effectiveRoomID) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold">Video Consultation</h1>
              <p className="text-muted-foreground">
                {bookingData?.lawyer?.name
                  ? `Connected with ${bookingData.lawyer.name}`
                  : "Consultation Room"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Card className="p-4">
              <div className="text-sm">
                <div>Room ID: {effectiveRoomID}</div>
                {bookingData && (
                  <div>
                    {bookingData.date} at {bookingData.time}
                  </div>
                )}
              </div>
            </Card>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Video Container */}
        <div
          ref={videoWrapperRef}
          className="relative flex-1 rounded-lg overflow-hidden min-h-0"
        >
          <div
            ref={containerRef}
            id="zego-container"
            className="w-full h-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
