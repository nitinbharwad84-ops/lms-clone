"use client";

import { useEffect, useRef, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface JitsiMeetClassroomProps {
  roomName: string;
  userName: string;
  userEmail: string;
  userRole: "admin" | "teacher" | "student";
}

export default function JitsiMeetClassroom({
  roomName,
  userName,
  userEmail,
  userRole,
}: JitsiMeetClassroomProps) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configure user permissions based on role
  const isModerator = userRole === "admin" || userRole === "teacher";

  return (
    <div className="w-full h-[calc(100vh-140px)] relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-xl" ref={containerRef}>
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 text-white">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
          <h2 className="text-xl font-bold">Connecting to Live Classroom...</h2>
          <p className="text-gray-400 mt-2">Preparing secure connection for {roomName}</p>
        </div>
      )}
      
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={`parul_lms_clone_${roomName.replace(/[^a-zA-Z0-9]/g, "_")}`}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: false,
          startScreenSharing: false,
          enableEmailInStats: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
          ],
        }}
        userInfo={{
          displayName: userName,
          email: userEmail,
        }}
        onApiReady={(externalApi) => {
          setIsLoaded(true);
          
          // Apply moderator settings if applicable
          if (isModerator) {
            // Can add specific moderator commands here
          }
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100%';
          iframeRef.style.width = '100%';
        }}
        onReadyToClose={() => {
          router.push('/live-sessions');
        }}
      />
    </div>
  );
}
