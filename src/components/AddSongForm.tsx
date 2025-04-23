import { Button, Form } from "react-bootstrap";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function AddSongForm({ value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <Form.Control type="text" value={value} onChange={onChange} placeholder="Enter a song title" />
      <Button type="submit" className="mt-2">Add Song</Button>
    </form>
  );
}
