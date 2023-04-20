import { atom } from "recoil";

const internetState = atom<boolean | null>({
  key: "internetState",
  default: null,
});

export default internetState;
