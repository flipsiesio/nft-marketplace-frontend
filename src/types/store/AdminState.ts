import { AdminActionTypes } from 'store/admin/actionsTypes';
import {
  PartialRecord, RequestStatus,
} from 'types';

export interface AdminState {
  ui: PartialRecord<AdminActionTypes, RequestStatus>,
}
