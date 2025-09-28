import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PhoneOff } from "lucide-react";

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
  const zpRef = useRef<any>(null);

  const { toast } = useToast();

  const bookingData = location.state?.bookingData;

  // Extract roomID from URL params or state
  const params = new URLSearchParams(location.search);
  const paramRoomID = params.get('roomID');
  const roomID = paramRoomID || location.state?.roomID;
  const effectiveRoomID = roomID;

  useEffect(() => {
    if (!effectiveRoomID) {
      navigate("/find");
      return;
    }

    const initializeVideoCall = () => {
      if (!window.ZegoUIKitPrebuilt || !containerRef.current) return;

      const appID = 642713127;
      const serverSecret = "8760851a8177d375dd756eb1e789f63c";
      const userID = Math.floor(Math.random() * 10000) + "";
      const userName = "User_" + userID;

      const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, effectiveRoomID, userID, userName);

      zpRef.current = window.ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current.joinRoom({
        container: containerRef.current,
        sharedLinks: [{
          name: 'Consultation Room',
          url: window.location.protocol + '//' + window.location.host + '/video-call?roomID=' + effectiveRoomID,
        }],
        scenario: {
          mode: window.ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
        showLeaveRoomButton: false,
        onCaptureVideoError: (error: unknown) => {
          console.error('Video capture error:', error);
          toast({
            title: "Camera Access Issue",
            description: "Please allow camera access in your browser settings and refresh the page.",
            variant: "destructive",
          });
        },
        onCaptureAudioError: (error: unknown) => {
          console.error('Audio capture error:', error);
          toast({
            title: "Microphone Access Issue",
            description: "Please allow microphone access in your browser settings and refresh the page.",
            variant: "destructive",
          });
        },
        onError: (error: unknown) => {
          console.error('ZegoUIKit error:', error);
          if ((error as any).type === 'media' || (error as any).message?.includes('permission') || (error as any).message?.includes('NotAllowed')) {
            toast({
              title: "Media Permission Denied",
              description: "Camera or microphone access was blocked. Check browser settings and try again.",
              variant: "destructive",
            });
          }
        },
      });
    };

    // Load Zego script if not already loaded
    if (!window.ZegoUIKitPrebuilt) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
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
  }, [effectiveRoomID, bookingData, navigate, toast]);

  const handleEndCall = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/");
  };

  if (!effectiveRoomID) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold">Video Consultation</h1>
              <p className="text-muted-foreground">
                {bookingData?.lawyer?.name ? `Connected with ${bookingData.lawyer.name}` : 'Consultation Room'}
              </p>
            </div>
          </div>
          <Card className="p-4">
            <div className="text-sm">
              <div>Room ID: {effectiveRoomID}</div>
              {bookingData && (
                <div>{bookingData.date} at {bookingData.time}</div>
              )}
            </div>
          </Card>
        </div>

        {/* Video Container */}
        <div
          ref={containerRef}
          className="w-full h-[calc(100vh-200px)] bg-black rounded-lg overflow-hidden"
          style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 10 }}
        ></div>

      </div>
    </div>
  );
};

export default VideoCall;
