import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'components';
import { RequestStatus } from 'types';
import { adminDownloadCsv } from 'store/admin/actionCreators';
import { AdminActionTypes } from 'store/admin/actionsTypes';
import { adminSelectors } from 'store/admin/selectors';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

const goToBttScan = () => {
  const linkScan = `${process.env.REACT_APP_SCAN_ADDRESS_URL as string}`;
  const address = `${process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string}`;
  window.open(
    `${linkScan}/${address}`,
    '_blank',
  );
};

const Admin = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const statusDownload = useSelector(adminSelectors.getStatus(AdminActionTypes.DownloadCsv));

  const handleDownload = useCallback(() => {
    dispatch(adminDownloadCsv({
      startDate,
      endDate,
    }));
  }, [startDate, endDate, dispatch]);

  return (
    <div className={styles.admin}>
      <h2 className={styles.title}>Sales history</h2>
      <div className={styles.containerDates}>
        <span className={styles.titleDate}>Select date range</span>
        <DatePicker
          wrapperClassName={styles.inputDate}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          wrapperClassName={styles.inputDate}
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
        />
      </div>
      <Button
        theme="primary"
        size="small"
        onClick={handleDownload}
        className={styles.buttonDownload}
        disabled={statusDownload === RequestStatus.REQUEST}
      >
        {statusDownload === RequestStatus.REQUEST ? 'Loading' : 'Download CSV'}
      </Button>
      <h2 className={styles.title}>Manage platform fees and prices</h2>
      <Button theme="primary" size="small" onClick={goToBttScan}>
        See contract on bttcscan
      </Button>
    </div>
  );
};

export { Admin };
