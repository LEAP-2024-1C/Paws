"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DonationContext } from "../context/donation_context";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface IComment {
  id: number;
  name: string;
  comment: string;
}

const Comments: React.FC = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<IComment[]>([]);
  const {
    comment,
    setComment,
    newComment,
    fetchSingleDonationPosts,
    oneDonationPost,
  } = useContext(DonationContext);

  useEffect(() => {
    if (oneDonationPost.comments) {
      setComments(oneDonationPost.comments);
    }
  }, [oneDonationPost]);

  const handleAddComment = async () => {
    if (comment.trim()) {
      await newComment(id);
      setComment("");
      await fetchSingleDonationPosts(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      {/* Comment input */}
      <div className="space-y-4 mb-8">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[100px] resize-none"
        />
        <Button
          onClick={handleAddComment}
          className="bg-[#FD7E14] hover:bg-[#FD7E14]/90">
          Post Comment
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{comment.name || "Anonymous"}</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
