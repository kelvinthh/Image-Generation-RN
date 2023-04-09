import { atom } from 'recoil';

const suggestionState = atom<string>({
  key: 'suggestionState',
  default: "",
});

export default suggestionState;
