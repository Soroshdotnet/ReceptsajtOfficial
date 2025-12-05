import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type CommentFormProps = {
  name: string;
  comment: string;
  onNameChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
};

export default function CommentForm({
  name,
  comment,
  onNameChange,
  onCommentChange,
  onSubmit,
}: CommentFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md mt-4">
      <Field>
        <FieldLabel htmlFor="comment-name">Ditt namn</FieldLabel>
        <Input
          id="comment-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <FieldError />
      </Field>

      <Field>
        <FieldLabel htmlFor="comment-text">Din kommentar</FieldLabel>
        <Textarea
          id="comment-text"
          rows={4}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <FieldError />
      </Field>

      <Button type="submit">Skicka kommentar</Button>
    </form>
  );
}