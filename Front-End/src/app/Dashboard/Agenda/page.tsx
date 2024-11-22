'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: string; // Change id to string
}

export default function Page() {
  const [events, setEvents] = useState<Event[]>([
    { title: "Event 1", id: "1", start: new Date(), allDay: true },
    { title: "Event 2", id: "2", start: new Date(), allDay: true },
    { title: "Event 3", id: "3", start: new Date(), allDay: true },
  ]);

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: false,
    id: '' // Initialize id as an empty string
  });

  // draggable element definition
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        }
      });
    }
  }, []);

  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime().toString() });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime().toString() }
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(data.event.id);
  }

  return (
    <div>
      <h1>Agenda</h1>

      <main className='flex justify-between mb-12 border-b border-violet-100 p-4'>
        <div className='grid grid-cols-10'>
          <div className='col-span-8'>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek"
              }}
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>

          <div id="draggable-el" className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50 text-black'>
            <h1 className='font-bold text-lg text-center'>Drag Event</h1>
            {events.map(event => (
              <div className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white text-black'
                title={event.title}
                key={event.id}>

                {event.title}

              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
