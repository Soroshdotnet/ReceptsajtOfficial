import React from "react";

// 1. Definiera vilka props komponenten tar emot
type CommentFormProps = {
  name: string;
  comment: string;
  onNameChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
};

// 2. ”Presentational component” som bara använder props
export default function CommentForm({
  name,
  comment,
  onNameChange,
  onCommentChange,
  onSubmit,
}: CommentFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(); // låt parent (RecipePage) sköta logiken
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 8, maxWidth: 520, marginTop: 12 }}
    >
      <input
        placeholder="Ditt namn"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <textarea
        placeholder="Din kommentar"
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        rows={4}
      />

      <button
        style={{
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        Skicka kommentar
      </button>
    </form>
  );
}