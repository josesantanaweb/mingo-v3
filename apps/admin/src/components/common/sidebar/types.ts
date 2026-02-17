import { IconName } from '../../../../../../packages/mingo-components/src/components/icon';

export interface Item {
  label: string;
  icon: IconName;
  path?: string;
  submenu?: SubmenuItem[];
}

export interface SubmenuItem {
  label: string;
  icon: IconName;
  path?: string;
}

