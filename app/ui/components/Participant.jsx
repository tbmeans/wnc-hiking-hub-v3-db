"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchUserById } from "@/app/api/data/data";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Participant({participant}) {
  const [participantData, setParticipantData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await fetchUserById(participant.user_id);
      const user_name = userInfo[0]?.user_name ? userInfo[0].user_name : "unknown";
      const avatar = userInfo[0]?.avatar ? userInfo[0].avatar : "newUser.png"
      setParticipantData({
        user_name: user_name,
        avatar: avatar,
      })
    }
    fetchData();
  }, [participant.user_id]);

  return (
    <Link href={`/bio/${participant.user_id}`} passHref>
      <div className="container border border-gray-400 p-2 cursor-pointer">
        <div className="flex flex-row gap-4">
          <Avatar className="w-4 h-4">
            <AvatarImage src={participantData.avatar} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full text-xs">
            <div>{participantData.user_name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
