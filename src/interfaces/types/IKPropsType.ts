import { IKLQIP } from './IKLQIP';

export type IKPropsType = {
  className?: string;
  loading?: string;
  alt?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  width?: string;
  height?: string;
  controls?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStart?: (file: File, xhr: XMLHttpRequest) => void;
  xhr?: XMLHttpRequest;
  lqip?: IKLQIP;
}