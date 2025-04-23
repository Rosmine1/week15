import { Alert } from "react-bootstrap";

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
};

export default function SongAlert({ show, setShow }: Props) {
  if (!show) return null;
  return (
    <Alert variant="danger" dismissible onClose={() => setShow(false)}>
      Please enter a song title before submitting.
    </Alert>
  );
}
