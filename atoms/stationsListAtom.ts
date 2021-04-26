import { atom } from "recoil";
import { StationPair } from "../types";

interface StationsListState {
  /**
   * Whether the data is loaded
   */
  loaded: boolean;
  /**
   * Whether the loaded data is an offline copy
   */
  offlineCopy: boolean;
  /**
   * CRS-Name pairs
   */
  data: StationPair[] | null;
}

export const stationsListAtom = atom<StationsListState>({
  key: "stationsList",
  default: {
    loaded: false,
    offlineCopy: false,
    data: null,
  },
});
