import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PhoneOff } from "lucide-react";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth } from 'firebase/auth';

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

  // useEffect(() => {
  //   const functions = getFunctions();
  //   connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  // }, []);

  useEffect(() => {
    if (!effectiveRoomID) {
      navigate("/find");
      return;
    }

    const initializeVideoCall = async () => {
      if (!window.ZegoUIKitPrebuilt || !containerRef.current) return;

      try {
        // For local testing, use hardcoded token generation (remove in production)
        const auth = getAuth();
        const user = auth.currentUser;
        const userID = user ? user.uid : Math.floor(Math.random() * 10000) + "";
        const userName = user ? user.displayName || user.email || "User_" + userID : "User_" + userID;
        const appID = 385548480;
        const serverSecret = "05cb1b9853ff76b184bdaa772c1851ef";
        const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, effectiveRoomID, userID, userName);

        zpRef.current = window.ZegoUIKitPrebuilt.create(kitToken);
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const shareHost = isLocal ? '10.243.202.240:8080' : window.location.host;
        const shareUrl = `http://${shareHost}/video-call?roomID=${effectiveRoomID}`;

        zpRef.current.joinRoom({
          container: containerRef.current,
          sharedLinks: [{
            name: 'Consultation Room',
            url: shareUrl,
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
          showJoinConfirmDialog: false,
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
      } catch (error) {
        console.error('Error initializing video call:', error);
        toast({
          title: "Video Call Initialization Failed",
          description: "Unable to join the video call. Please try again.",
          variant: "destructive",
        });
      }
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
        <div className="relative w-full h-[calc(100vh-200px)] rounded-lg overflow-hidden">
          <div
            ref={containerRef}
            className="w-full h-full"
          ></div>
        </div>

      </div>
    </div>
  );
};

export default VideoCall;
