"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DonationContext } from "../context/donation_context";
import { useParams } from "next/navigation";

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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Сэтгэгдэл үлдээх</h2>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Сэтгэгдлээ бичнэ үү..."
        className="mb-4"
      />
      <Button onClick={handleAddComment} className="mb-6">
        Сэтгэгдэл нэмэх
      </Button>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border rounded-md shadow-sm bg-gray-50"
          >
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
