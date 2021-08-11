import { IChannel } from "../../../../shared/types";

export interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ListProps {
  channels: [{ name: string; children: IChannel[]; current: boolean }];
}
