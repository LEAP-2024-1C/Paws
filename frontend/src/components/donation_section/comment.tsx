"use client";
// CommentSection.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: number;
  text: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>("");

  const handleAddComment = () => {
    if (input.trim()) {
      const newComment = { id: Date.now(), text: input };
      setComments([newComment, ...comments]);
      setInput("");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Сэтгэгдэл үлдээх</h2>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
