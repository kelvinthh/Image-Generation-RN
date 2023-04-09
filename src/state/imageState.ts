import { atom } from 'recoil';
import { ImageUrl } from '../types/imageUrl';

const imagesState = atom<ImageUrl[]>({
  key: 'imagesState',
  default: [],
});

export default imagesState;
