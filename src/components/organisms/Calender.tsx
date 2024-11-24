import type { FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import '@fullcalendar/react/dist/vdom';
import { Box } from '@chakra-ui/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AvailableTerm } from 'domains';
type Props = {
  availableDates: AvailableTerm[];
};
const Calender: FC<Props> = (props) => {
  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        headerToolbar={{
          left: 'prev',
          center: 'title',
          // right: 'next today dayGridMonth timeGridWeek',
          right: 'next',
        }}
        // dateClick={handleDateClick}
        // events={available_date}
        events={props.availableDates}
        // selectable={true}
        // eventContent={renderEventContent}
      />
    </Box>
  );
};

export default Calender;
