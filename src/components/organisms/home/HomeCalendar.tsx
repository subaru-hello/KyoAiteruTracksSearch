import React from 'react';
import { useAppSelector } from 'hooks/useStore';
import Calender from '../Calender';
import { selectAvailableDate } from 'examples/availableDate/availableDateSlice';

// TODO: ここのデータ取得がHomeの画面描画のボトルネックになっていたらSuspenceを導入して非同期処理を遅延させてクルクルさせる
const HomeCalendar = () => {
  const availableDates = useAppSelector(selectAvailableDate);
  // TODO: availableDatesのデータ構造を、１重の配列、もしくはmapにしてアクセスしやすくする
  return <Calender availableDates={availableDates[0]?.availableDates} />;
};

export default HomeCalendar;
