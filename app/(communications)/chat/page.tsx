"use client";

import {
  ChatCircleDots,
  MagnifyingGlass as MagnifyingGlassIcon,
  UsersThree,
  DotsThreeVertical as DotsThreeVerticalIcon,
  PaperPlaneTilt,
  Smiley as SmileyIcon,
  Paperclip as PaperclipIcon,
  Gear as GearIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard";
import { ChatRoomItem } from "@/components/chat/ChatRoomItem";
import { ChatMemberItem } from "@/components/chat/ChatMemberItem";

// Mock data
const chatRooms = [
  {
    id: 1,
    name: "All Members",
    lastMessage: "Welcome everyone to the church chat!",
    lastMessageTime: "10:30 AM",
    memberCount: 150,
    unread: 0,
    avatar: "AM",
    messageStatus: "read" as const,
  },
  {
    id: 2,
    name: "CYF",
    lastMessage: "See you all at the youth meeting tomorrow",
    lastMessageTime: "Yesterday",
    memberCount: 3,
    online: 1,
    unread: 3,
    avatar: "CY",
  },
  {
    id: 3,
    name: "Worship Team",
    lastMessage: "Practice starts at 6 PM",
    lastMessageTime: "2:45 PM",
    memberCount: 12,
    online: 3,
    unread: 0,
    avatar: "WT",
    messageStatus: "delivered" as const,
  },
];

const members = [
  {
    id: 1,
    name: "Tjay",
    email: "tjay@example.com",
    online: true,
    avatar: "T",
  },
  {
    id: 2,
    name: "Angel",
    email: "e.nkam23@gmail.com",
    online: false,
    avatar: "A",
  },
  {
    id: 3,
    name: "Joel",
    email: "joelmuna@gmail.com",
    online: false,
    avatar: "J",
  },
  {
    id: 4,
    name: "Moe",
    email: "moemnoa23@gmail.com",
    online: false,
    avatar: "M",
  },
];

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(chatRooms[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [showMembers, setShowMembers] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const onlineMembers = members.filter((m) => m.online);
  const allMembers = members;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <ChatCircleDots className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>
        <Button variant="ghost" size="icon">
          <DotsThreeVerticalIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={ChatCircleDots} label="Chat Rooms" value="3" />
        <StatCard icon={UsersThree} label="Total Members" value="150" />
        <StatCard icon={UsersThree} label="Online Now" value="1" />
      </div>

      {/* Chat Container */}
      <div className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 280px)" }}>
        <div className="h-full flex">
          {/* Left Sidebar - Chat Rooms */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
            {/* Sidebar Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0 bg-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Chats
              </h2>
            </div>

            {/* Search */}
            <div className="px-3 py-2 border-b border-gray-200 flex-shrink-0 bg-white">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search or start new chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9 text-sm bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                />
              </div>
            </div>

            {/* Chat Room List */}
            <div className="flex-1 overflow-y-auto bg-white">
              {chatRooms.map((room) => (
                <ChatRoomItem
                  key={room.id}
                  {...room}
                  isActive={selectedRoom?.id === room.id}
                  onClick={() => setSelectedRoom(room)}
                />
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
            {selectedRoom ? (
              <>
                {/* Chat Header */}
                <div className="h-16 bg-gray-100 border-b border-gray-200 px-4 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-10 h-10 bg-primary-light flex-shrink-0">
                      <AvatarFallback className="text-primary font-semibold">
                        {selectedRoom.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold text-gray-900 truncate">
                        {selectedRoom.name}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {selectedRoom.memberCount} members
                        {selectedRoom.online && ` • ${selectedRoom.online} online`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon-sm" className="text-gray-600">
                      <MagnifyingGlassIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowMembers(!showMembers)}
                      className={`text-gray-600 ${showMembers ? "bg-gray-200" : ""}`}
                    >
                      <UsersThree className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-gray-600">
                      <DotsThreeVerticalIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto px-16 py-4"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4d4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <ChatCircleDots className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-base font-medium text-gray-700 mb-1">
                      No messages yet
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Start the conversation with your group.
                    </p>
                  </div>
                </div>

                {/* Message Input */}
                <div className="bg-gray-100 border-t border-gray-200 px-4 py-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm" className="flex-shrink-0 text-gray-600 hover:bg-gray-200">
                      <SmileyIcon className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="flex-shrink-0 text-gray-600 hover:bg-gray-200">
                      <PaperclipIcon className="w-6 h-6" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="bg-white border-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="flex-shrink-0 rounded-full w-10 h-10 p-0"
                      size="icon"
                    >
                      <PaperPlaneTilt className="w-5 h-5" weight="fill" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-lighter0/20 rounded-full blur-3xl" />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <ChatCircleDots className="w-32 h-32 text-gray-300" weight="thin" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-light text-gray-700 mb-3">
                    Gracely Chat
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                    Send and receive messages with your church community.
                    <br />
                    Select a chat to get started.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Members Panel */}
          {showMembers && selectedRoom && (
            <div className="w-80 border-l border-gray-200 flex flex-col bg-white">
              {/* Members Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Group Info</h2>
              </div>

              {/* Group Details */}
              <div className="p-6 border-b border-gray-200 flex flex-col items-center bg-white">
                <Avatar className="w-24 h-24 bg-primary-light mb-3">
                  <AvatarFallback className="text-primary font-semibold text-2xl">
                    {selectedRoom.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {selectedRoom.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Group • {selectedRoom.memberCount} members
                </p>
              </div>

              {/* Members List */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 bg-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">
                    {selectedRoom.memberCount} members
                  </h3>
                </div>
                
                <div className="p-2">
                  {/* Online Members */}
                  {onlineMembers.length > 0 && (
                    <div className="mb-4">
                      {onlineMembers.map((member) => (
                        <ChatMemberItem key={member.id} {...member} />
                      ))}
                    </div>
                  )}

                  {/* All Members */}
                  <div>
                    {allMembers.map((member) => (
                      <ChatMemberItem key={member.id} {...member} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
