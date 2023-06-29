import { Space } from 'src/modules/space/space.schema';

export interface User {
  space: string;
  _id: string;
  email: string;
  displayName: string;
}
