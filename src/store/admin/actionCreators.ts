import { RequestStatus } from 'types';
import { AdminState } from 'types/store/AdminState';
import { AdminActionTypes } from './actionsTypes';

export const adminSetState = (payload: Partial<AdminState>) => ({
  type: AdminActionTypes.SetState,
  payload,
});

export const adminSetStatus = (
  payload: { type: AdminActionTypes, status: RequestStatus },
) => ({
  type: AdminActionTypes.SetStatus,
  payload,
});

export const adminGetData = () => ({
  type: AdminActionTypes.GetData,
});

export const adminDownloadCsv = (payload: {
  startDate: Date,
  endDate: Date,
}) => ({
  type: AdminActionTypes.DownloadCsv,
  payload,
});
