export interface IModalComponentProps {
  [key: string]: any;
}

export interface IModalProps {
  name?: string;
  delay?: number;
  resizable?: boolean;
  adaptive?: boolean;
  draggable?: boolean;
  scrollable?: boolean;
  reset?: boolean;
  clickToClose?: boolean;
  classes?: string | string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  width?: number | string;
  height?: number | string;
}

export interface IPaginationRequestPayload {
  limit?: number;
  start?: number;
  end: number;
}
